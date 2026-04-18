import React from 'react';
import { Target, Users, Zap, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Programs = () => {
  const router = useRouter();

  const programs = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Foundation Phase",
      ages: "Ages 5-8",
      description: "Focus on fundamental motor skills, ball mastery, and fostering a deep love for the game in a positive, fun environment.",
      features: ["Basic dribbling & control", "Coordination & balance", "1v1 attacking skills"]
    },
    {
      icon: <Zap className="w-8 h-8 text-indigo-600" />,
      title: "Development Phase",
      ages: "Ages 9-13",
      description: "Emphasize technical proficiency, small-group tactical awareness, and competitive preparedness.",
      features: ["Advanced ball mastery", "Positional awareness", "Small-sided gameplay"]
    },
    {
      icon: <Users className="w-8 h-8 text-amber-600" />,
      title: "Elite Performance",
      ages: "Ages 14-18",
      description: "Rigorous physical and tactical training tailored for high-level competition and collegiate pathways.",
      features: ["Match performance analysis", "Strength & conditioning", "Professional pathway guidance"]
    }
  ];

  return (
    <section className="py-24 bg-slate-50" id="programs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-3 block">Training Pathways</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our Elite Programs
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A structured curriculum designed to develop technically gifted, tactically aware, and physically dominant players.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-2xl transition-all group">
              <div className="bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl mb-6 group-hover:bg-blue-50 transition-colors">
                {program.icon}
              </div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200 rounded-full mb-3">
                  {program.ages}
                </span>
                <h3 className="text-2xl font-bold text-slate-900">{program.title}</h3>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {program.description}
              </p>
              
              <ul className="space-y-3 border-t border-slate-100 pt-6">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Specialized Training Options */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-100 text-blue-700 mb-4">
              Advanced Modules
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Specialized Training Options
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Beyond our core programs, we offer specialized training sessions to help players excel in specific areas of the game.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Strength & Conditioning",
                desc: "Age-appropriate fitness training",
                badge: "01",
                icon: "💪",
                accent: "from-emerald-500 to-teal-500"
              },
              {
                title: "Position-Specific",
                desc: "Focus on specialized roles",
                badge: "02",
                icon: "🎯",
                accent: "from-blue-600 to-indigo-600"
              },
              {
                title: "Goalkeeper Training",
                desc: "Specialized for goalkeepers",
                badge: "03",
                icon: "🧤",
                accent: "from-amber-500 to-orange-500"
              },
              {
                title: "1-on-1 Sessions",
                desc: "Personalized coaching",
                badge: "04",
                icon: "⚡",
                accent: "from-fuchsia-600 to-rose-500"
              }
            ].map((option, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${option.accent}`}></div>

                <div className="flex items-start justify-between mb-5">
                  <span className="text-3xl leading-none">{option.icon}</span>
                  <span className="text-xs font-black tracking-widest text-slate-400">{option.badge}</span>
                </div>

                <h4 className="text-xl font-extrabold text-slate-900 mb-2 leading-tight">{option.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{option.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button 
              onClick={() => router.push('/#contact')} 
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg"
            >
              Request Special Training
            </button>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-200 pt-16 text-center">
          <button 
            onClick={() => router.push('/#contact')} 
            className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-5 rounded-2xl font-bold text-lg inline-flex items-center gap-3 transition-colors shadow-xl"
          >
            Find The Right Program
          </button>
        </div>


      </div>
    </section>
  );
};

export default Programs;

