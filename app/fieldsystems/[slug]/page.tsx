import { notFound } from 'next/navigation';
import PublicNav from '@/components/navigation/PublicNav';
import Link from 'next/link';
import { ArrowLeft, Star, Zap, Globe, Music } from 'lucide-react';

const FIELD_SYSTEMS = {
  'star-love': {
    title: 'Star Love',
    description: 'Relational frequency mapping and connection architecture',
    icon: Star,
    status: 'coming-online',
    content: {
      overview: 'Star Love maps the relational frequencies that connect us across dimensions. Through conscious relationship design, we activate the sovereign field between beings.',
      features: [
        'Relational frequency analysis',
        'Connection architecture mapping',
        'Conscious relationship design',
        'Sovereign field activation'
      ]
    }
  },
  'quantum': {
    title: 'Quantum Architecture',
    description: 'Probability collapse and quantum field navigation',
    icon: Zap,
    status: 'coming-online',
    content: {
      overview: 'Quantum Architecture explores the collapse of probability waves through conscious observation. Navigate quantum fields with precision and intention.',
      features: [
        'Probability wave analysis',
        'Quantum field navigation',
        'Conscious observation protocols',
        'Reality architecture tools'
      ]
    }
  },
  'galactic': {
    title: 'Galactic Structuring',
    description: 'Stellar navigation and cosmic consciousness mapping',
    icon: Globe,
    status: 'coming-online',
    content: {
      overview: 'Galactic Structuring connects us to stellar consciousness and cosmic navigation. Access galactic memory and stellar intelligence.',
      features: [
        'Stellar consciousness mapping',
        'Galactic memory access',
        'Cosmic navigation protocols',
        'Stellar intelligence integration'
      ]
    }
  },
  'sonic': {
    title: 'Sonic Architecture',
    description: 'Frequency-based consciousness and sound field navigation',
    icon: Music,
    status: 'coming-online',
    content: {
      overview: 'Sonic Architecture explores consciousness through frequency and sound. Navigate the sonic fields that structure reality.',
      features: [
        'Frequency consciousness mapping',
        'Sound field navigation',
        'Sonic reality architecture',
        'Vibrational intelligence access'
      ]
    }
  }
};

export default function FieldSystemPage({ params }: { params: { slug: string } }) {
  const system = FIELD_SYSTEMS[params.slug as keyof typeof FIELD_SYSTEMS];

  if (!system) {
    notFound();
  }

  const Icon = system.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-navy via-deep-navy to-deep-navy">
      <PublicNav />
      
      {/* Header */}
      <header className="bg-deep-navy/50 backdrop-blur-sm border-b border-deep-gold/20">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-creamy-white hover:text-deep-gold transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Field Systems
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-deep-gold/20 rounded-full mb-8">
            <Icon className="w-12 h-12 text-deep-gold" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold text-creamy-white mb-6">
            {system.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-deep-gold/80 font-lora italic mb-8">
            {system.description}
          </p>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-deep-gold/20 border border-deep-gold/30 rounded-lg text-deep-gold mb-12">
            <div className="w-2 h-2 bg-deep-gold rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Coming Online</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-8 border border-deep-gold/20 mb-8">
            <h2 className="text-2xl font-montserrat font-semibold text-creamy-white mb-4">
              System Overview
            </h2>
            <p className="text-creamy-white/80 text-lg font-lora leading-relaxed">
              {system.content.overview}
            </p>
          </div>

          <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-8 border border-deep-gold/20 mb-8">
            <h2 className="text-2xl font-montserrat font-semibold text-creamy-white mb-6">
              Core Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {system.content.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-deep-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-creamy-white/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="bg-deep-navy/20 backdrop-blur-sm rounded-lg p-8 border border-deep-gold/20 text-center">
            <h2 className="text-2xl font-montserrat font-semibold text-creamy-white mb-4">
              Activation in Progress
            </h2>
            <p className="text-creamy-white/80 mb-6">
              This Field System is currently being calibrated and will be available soon. 
              Stay connected to receive updates on activation.
            </p>
            
            {/* Signup CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-deep-navy/50 border border-deep-gold/30 rounded-lg text-creamy-white placeholder-creamy-white/60 focus:outline-none focus:border-deep-gold/60 focus:ring-2 focus:ring-deep-gold/20 w-80"
              />
              <button className="px-6 py-3 bg-deep-gold text-deep-navy font-semibold rounded-lg hover:bg-deep-gold/90 transition-colors">
                Stay Connected
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
