'use client';

import { useState } from 'react';

export default function ConsultingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentChallenges: '',
    resonanceGoals: '',
    preferredSession: 'single',
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual booking logic
    console.log('Consulting form submitted:', formData);
    alert('Thank you! We will contact you soon to schedule your session.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic text-deep-navy">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gradient">Consciousness Field Assessment</h1>
          <p className="text-xl text-creamy-white/80 max-w-2xl mx-auto">
            Discover your resonance frequency and unlock your next level of consciousness development through personalized 1:1 sessions.
          </p>
        </div>

        {/* Service Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="card-elevated">
            <h2 className="text-2xl font-bold mb-4 text-gradient">What You'll Get</h2>
            <ul className="space-y-3 text-deep-navy/80">
              <li className="flex items-start">
                <span className="text-deep-gold mr-3">•</span>
                <span>90-minute personalized resonance assessment</span>
              </li>
              <li className="flex items-start">
                <span className="text-deep-gold mr-3">•</span>
                <span>Detailed Resonance Report with Orb analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-deep-gold mr-3">•</span>
                <span>Personalized development plan and next steps</span>
              </li>
              <li className="flex items-start">
                <span className="text-deep-gold mr-3">•</span>
                <span>5 scrollstream transmissions for daily practice</span>
              </li>
              <li className="flex items-start">
                <span className="text-deep-gold mr-3">•</span>
                <span>Follow-up support and guidance</span>
              </li>
            </ul>
          </div>

          <div className="card-elevated">
            <h2 className="text-2xl font-bold mb-4 text-gradient">Investment</h2>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-deep-gold mb-2">$500</div>
                <div className="text-deep-navy/80">Single Session</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cosmic-blue mb-2">$1,200</div>
                <div className="text-deep-navy/80">3-Session Package</div>
                <div className="text-sm text-deep-gold">Save $300</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-resonance mb-2">$2,500</div>
                <div className="text-deep-navy/80">6-Month Program</div>
                <div className="text-sm text-deep-gold">Monthly sessions + ongoing support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="card-elevated">
          <h2 className="text-2xl font-bold mb-6 text-center text-gradient">Book Your Session</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-deep-navy/80 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-cosmic"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-navy/80 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-cosmic"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-deep-navy/80 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-deep-gold/40 rounded-lg px-4 py-3 text-creamy-white placeholder-creamy-white/60 focus:outline-none focus:ring-2 focus:ring-deep-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-deep-navy/80 mb-2">
                Current Challenges *
              </label>
              <textarea
                name="currentChallenges"
                value={formData.currentChallenges}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="What are you currently working through or seeking clarity on?"
                className="input-cosmic resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-deep-navy/80 mb-2">
                Resonance Goals *
              </label>
              <textarea
                name="resonanceGoals"
                value={formData.resonanceGoals}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="What would you like to achieve or develop in your consciousness journey?"
                className="input-cosmic resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-deep-navy/80 mb-2">
                Preferred Session Type *
              </label>
              <select
                name="preferredSession"
                value={formData.preferredSession}
                onChange={handleInputChange}
                required
                className="input-cosmic"
              >
                <option value="single">Single Session ($500)</option>
                <option value="package">3-Session Package ($1,200)</option>
                <option value="program">6-Month Program ($2,500)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-deep-navy/80 mb-2">
                Additional Information
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={3}
                placeholder="Anything else you'd like me to know before our session?"
                className="input-cosmic resize-none"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn-primary text-lg px-8 py-4"
              >
                Book Your Session
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-deep-navy/60">
          <p>© 2025 Stardust to Sovereignty.</p>
        </div>
      </div>
    </div>
  );
}
