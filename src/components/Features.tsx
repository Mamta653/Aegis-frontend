import { Clock, Users, FileText, Lock, Stethoscope, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Stethoscope,
      title: 'Virtual Consultations',
      description: 'Connect with healthcare providers through secure video calls, anytime, anywhere.',
      route: '/consultations', // ✅ clickable
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'AI-powered triage and assistance available round the clock for urgent concerns.',
      route: null,
    },
    {
      icon: Users,
      title: 'Multi-Specialist Network',
      description: 'Access to a diverse network of specialists across all medical disciplines.',
      route: null,
    },
    {
      icon: FileText,
      title: 'Digital Health Records',
      description: 'Secure, encrypted health records accessible across all your healthcare touchpoints.',
      route: '/health-records', // ✅ we'll build this next
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'AI-driven insights that predict health trends and recommend preventive measures.',
      route: null,
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'HIPAA-compliant with military-grade encryption protecting your sensitive data.',
      route: null,
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-[#E9EFEC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Complete Healthcare Platform
          </h2>
          <p className="text-xl text-black/60 max-w-3xl mx-auto">
            Everything you need for modern healthcare delivery in one intelligent platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => feature.route && navigate(feature.route)}
              className={`bg-[#FDFDFB] rounded-2xl p-8 border border-black/5 hover:shadow-xl transition-all hover:-translate-y-1 group
                ${feature.route ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                <feature.icon className="w-7 h-7 text-[#2F5233]" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3 flex items-center gap-2">
                {feature.title}
                {/* ✅ Show arrow if card is clickable */}
                {feature.route && (
                  <span className="text-[#2F5233] opacity-0 group-hover:opacity-100 transition-opacity text-base">
                    →
                  </span>
                )}
              </h3>
              <p className="text-black/60 leading-relaxed">{feature.description}</p>

              {/* ✅ Show "Explore" badge on clickable cards */}
              {feature.route && (
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#2F5233] bg-[#2F5233]/10 px-3 py-1 rounded-full">
                  Explore Feature →
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-all hover:shadow-2xl hover:scale-105">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
}