import { Brain, Zap, Shield, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AgenticAIFeature() {
  const [typedText, setTypedText] = useState('');
  const fullText =
    'Unlike traditional AI that waits for commands, our agentic AI takes initiative. It monitors patient vitals, predicts health risks, schedules preventive care, and coordinates with healthcare providers—autonomously.';

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);

  const features = [
    {
      icon: Brain,
      title: 'Autonomous Decision Making',
      description:
        'AI agents that analyze, reason, and make informed healthcare decisions without constant human input.',
    },
    {
      icon: Zap,
      title: 'Proactive Care',
      description:
        'Anticipates health issues before they escalate, scheduling interventions and alerting providers automatically.',
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description:
        'HIPAA-compliant infrastructure with end-to-end encryption protecting every patient interaction.',
    },
    {
      icon: Activity,
      title: 'Real-Time Monitoring',
      description:
        'Continuous health tracking with intelligent alerts that adapt to individual patient patterns.',
    },
  ];

  return (
    <section id="agents" className="py-20 lg:py-32 bg-[#FDFDFB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            The Agentic AI Difference
          </h2>
          <p className="text-xl text-black/60 max-w-3xl mx-auto">
            Moving beyond reactive chatbots to autonomous healthcare intelligence
          </p>
        </div>

        <div className="mb-16">
          <div className="max-w-4xl mx-auto bg-[#E9EFEC] rounded-3xl p-8 md:p-12 shadow-xl border border-black/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#2F5233]/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2">Live Agent Intelligence</h3>
                  <p className="text-sm text-black/50">Real-time insight generation</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <p className="text-lg leading-relaxed text-black/80 font-medium min-h-[200px]">
                  {typedText}
                  <span className="inline-block w-0.5 h-6 bg-black ml-1 animate-pulse" />
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 text-sm text-black/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#2F5233] rounded-full animate-pulse" />
                  <span>AI Active</span>
                </div>
                <span>•</span>
                <span>Processing healthcare data</span>
                <span>•</span>
                <span>Learning patient patterns</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 border border-black/5 hover:border-black/20 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-[#E9EFEC] rounded-xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:scale-110 transition-all">
                <feature.icon className="w-7 h-7 text-black group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
              <p className="text-black/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
