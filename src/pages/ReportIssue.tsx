import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, MapPin, Zap, Check, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SeverityBadge from '@/components/SeverityBadge';
import { issueTypeLabels, issueTypeIcons, IssueType, IssueSeverity } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type Step = 'upload' | 'analyzing' | 'confirm' | 'submitted';

export default function ReportIssue() {
  const [step, setStep] = useState<Step>('upload');
  const [preview, setPreview] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<{ type: IssueType; severity: IssueSeverity; description: string }>({
    type: 'pothole',
    severity: 'mid',
    description: '',
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      setPreview(base64);
      setStep('analyzing');

      try {
        const { data, error } = await supabase.functions.invoke('classify-issue', {
          body: { imageBase64: base64 },
        });

        if (error) throw error;

        setAiResult({
          type: data.type as IssueType,
          severity: data.severity as IssueSeverity,
          description: data.description,
        });
        setStep('confirm');
      } catch (err) {
        console.error('AI classification failed:', err);
        toast({
          title: 'Classification failed',
          description: 'Could not analyze the image. Please try again.',
          variant: 'destructive',
        });
        setStep('upload');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    setStep('submitted');
    setTimeout(() => {
      toast({ title: '🎉 +50 Points!', description: 'Your report has been submitted successfully.' });
    }, 500);
  };

  return (
    <div className="px-4 pt-6 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-heading font-bold text-foreground">Report Issue</h1>
      </div>

      <AnimatePresence mode="wait">
        {step === 'upload' && (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => fileRef.current?.click()}
              className="w-full aspect-[4/3] glass-card border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-4 hover:border-primary/60 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-heading font-semibold text-foreground">Take a Photo</p>
                <p className="text-sm text-muted-foreground mt-1">or upload from gallery</p>
              </div>
            </motion.button>
            <p className="text-xs text-center text-muted-foreground">
              Our AI will automatically detect the issue type, severity, and location
            </p>
          </motion.div>
        )}

        {step === 'analyzing' && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 text-center pt-10">
            {preview && <img src={preview} alt="Uploaded" className="w-48 h-48 mx-auto rounded-xl object-cover" />}
            <div className="space-y-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
              <p className="font-heading font-semibold text-foreground">Analyzing with AI...</p>
              <p className="text-sm text-muted-foreground">Detecting issue type and severity</p>
            </div>
            <div className="space-y-2 max-w-xs mx-auto">
              {['Scanning image...', 'Classifying issue type...', 'Assessing severity...'].map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.7 }}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <Zap className="w-3 h-3 text-primary" />
                  {text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'confirm' && (
          <motion.div key="confirm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            {preview && <img src={preview} alt="Issue" className="w-full h-48 rounded-xl object-cover" />}
            
            <div className="glass-card p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-foreground">AI Analysis</h3>
                <Zap className="w-4 h-4 text-primary" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Issue Type</span>
                  <span className="text-sm font-medium text-foreground">
                    {issueTypeIcons[aiResult.type]} {issueTypeLabels[aiResult.type]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Severity</span>
                  <SeverityBadge severity={aiResult.severity} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="text-xs text-primary flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Auto-detected via GPS
                  </span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">AI Description</span>
                  <p className="text-sm text-foreground bg-muted/50 rounded-lg p-3">{aiResult.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Est. Resolution</span>
                  <span className="text-sm text-foreground">
                    {aiResult.severity === 'high' ? '48 hours' : aiResult.severity === 'mid' ? '7 days' : '30 days'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep('upload')} className="flex-1 border-border text-foreground">
                Retake
              </Button>
              <Button onClick={handleSubmit} className="flex-1 bg-primary text-primary-foreground font-heading font-semibold">
                Submit Report
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">You'll earn +50 points for this report</p>
          </motion.div>
        )}

        {step === 'submitted' && (
          <motion.div
            key="submitted"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center pt-20 space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto"
            >
              <Check className="w-10 h-10 text-green-400" />
            </motion.div>
            <h2 className="text-2xl font-heading font-bold text-foreground">Report Submitted! 🎉</h2>
            <p className="text-muted-foreground">Your civic report has been logged. You earned <span className="text-accent font-semibold">+50 points</span>!</p>
            <div className="glass-card p-4 inline-flex items-center gap-3 mx-auto">
              <span className="text-2xl">🕵️</span>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Keep it up!</p>
                <p className="text-xs text-muted-foreground">2 more reports to unlock "City Detective"</p>
              </div>
            </div>
            <div className="pt-4">
              <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground font-heading">
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
