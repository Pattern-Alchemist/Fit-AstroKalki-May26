'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, CheckCircle } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';

interface TimeSlot {
  id: string;
  date: Date;
  time: string;
  duration: number; // minutes
  type: 'consult' | 'assessment' | 'session';
  available: boolean;
}

// Generate mock slots for demo
function generateSlots(startDate: Date, daysAhead: number = 30): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  for (let i = 0; i < daysAhead; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Skip Sundays
    if (date.getDay() === 0) continue;

    times.forEach((time) => {
      const slotDate = new Date(date);
      const [hours, minutes] = time.split(':');
      slotDate.setHours(parseInt(hours), parseInt(minutes));

      slots.push({
        id: `${date.toISOString()}-${time}`,
        date: slotDate,
        time,
        duration: 30,
        type: 'consult',
        available: Math.random() > 0.3, // 70% available
      });
    });
  }

  return slots;
}

export default function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingStep, setBookingStep] = useState<'calendar' | 'confirm'>('calendar');

  const slots = useMemo(() => generateSlots(new Date()), []);

  const currentMonth = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  // Get days in current month view
  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = monthEnd.getDate();
  const startingDayOfWeek = monthStart.getDay();

  const calendarDays = [];
  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  // Add all days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const getDaySlots = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return slots.filter(
      (slot) =>
        slot.date.toDateString() === date.toDateString() && slot.available
    );
  };

  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setBookingStep('confirm');
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;

    const dateString = selectedSlot.date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    const message = `Hi Kaustubh, I'd like to book a free 15-min consultation for:

Date: ${dateString}
Time: ${selectedSlot.time}

Looking forward to discussing my fitness goals with you!`;

    const whatsappLink = generateWhatsAppLink(siteConfig.whatsappNumber, message);
    window.location.href = whatsappLink;
  };

  return (
    <section className="min-h-screen bg-zinc-950 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Book Your Free Consultation
          </h1>
          <p className="text-zinc-300 text-lg">
            Select a time that works best for you. Our first 15-minute call is completely free
            and helps us understand your fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              {bookingStep === 'calendar' ? (
                <div className="space-y-6">
                  {/* Month Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">{currentMonth}</h2>
                    <div className="flex gap-2">
                      <button
                        onClick={prevMonth}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="w-5 h-5 text-zinc-400" />
                      </button>
                      <button
                        onClick={nextMonth}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                        aria-label="Next month"
                      >
                        <ChevronRight className="w-5 h-5 text-zinc-400" />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="space-y-4">
                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                        (day) => (
                          <div
                            key={day}
                            className="text-center text-xs font-semibold text-zinc-400 py-2"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-2">
                      {calendarDays.map((day, index) => {
                        const daySlots = day ? getDaySlots(day) : [];
                        const isCurrentMonth = day !== null;
                        const isPastDate =
                          isCurrentMonth &&
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            day
                          ) < new Date();

                        return (
                          <button
                            key={index}
                            onClick={() => {
                              if (day && daySlots.length > 0) {
                                // Show time slots for this day
                              }
                            }}
                            className={`aspect-square rounded-lg border transition-all flex flex-col items-center justify-center text-sm font-medium ${
                              !isCurrentMonth
                                ? 'bg-transparent border-transparent text-zinc-600'
                                : isPastDate
                                  ? 'bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed'
                                  : daySlots.length > 0
                                    ? 'bg-lime-400/10 border-lime-400/30 text-white hover:bg-lime-400/20 hover:border-lime-400/50 cursor-pointer'
                                    : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                            }`}
                          >
                            {day && (
                              <>
                                <span>{day}</span>
                                {daySlots.length > 0 && (
                                  <span className="text-xs text-lime-400 mt-0.5">
                                    {daySlots.length} slots
                                  </span>
                                )}
                              </>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots for selected week */}
                  <div className="border-t border-zinc-800 pt-6">
                    <h3 className="font-semibold text-white mb-4">Available Times</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                      {slots
                        .filter(
                          (slot) =>
                            slot.available &&
                            Math.abs(
                              slot.date.getTime() - currentDate.getTime()
                            ) <
                              7 * 24 * 60 * 60 * 1000 && // Within a week
                            slot.date > new Date()
                        )
                        .map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => handleSelectSlot(slot)}
                            className="p-3 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-lime-400/20 hover:border-lime-400/30 transition-all text-sm font-medium text-white"
                          >
                            <div className="text-xs text-zinc-400 mb-1">
                              {slot.date.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </div>
                            <div>{slot.time}</div>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Confirm step
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white">Confirm Your Booking</h2>

                  {selectedSlot && (
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-zinc-400 uppercase tracking-wider">
                            Date & Time
                          </p>
                          <p className="text-white font-semibold">
                            {selectedSlot.date.toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                            })}{' '}
                            at {selectedSlot.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-zinc-400 uppercase tracking-wider">
                            Duration
                          </p>
                          <p className="text-white font-semibold">
                            {selectedSlot.duration} minutes - Free Consultation
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-lime-400/10 border border-lime-400/30 rounded-lg p-4">
                    <p className="text-sm text-zinc-300">
                      We&apos;ll send you a WhatsApp message to confirm this booking. You&apos;ll
                      receive a link to join the call 15 minutes before your scheduled time.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setBookingStep('calendar')}
                      className="px-6 py-2.5 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleConfirmBooking}
                      className="ml-auto px-6 py-2.5 bg-lime-400 text-zinc-950 font-semibold rounded-lg hover:bg-lime-300 transition-all flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Confirm & Send WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6 sticky top-24">
              <div>
                <h3 className="font-bold text-white mb-3">What to Expect</h3>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-lime-400 font-bold mt-0.5">•</span>
                    <span>15-minute free consultation call</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime-400 font-bold mt-0.5">•</span>
                    <span>Discuss your fitness goals and current situation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime-400 font-bold mt-0.5">•</span>
                    <span>Get a personalized recommendation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime-400 font-bold mt-0.5">•</span>
                    <span>No obligation to purchase</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-white mb-3">Booking Note</h3>
                <p className="text-sm text-zinc-400">
                  Slots are typically available Monday to Friday, 9 AM - 6 PM IST. Confirmation will
                  be sent via WhatsApp.
                </p>
              </div>

              <div className="bg-lime-400/10 border border-lime-400/30 rounded-lg p-3">
                <p className="text-xs font-semibold text-lime-400 mb-1">
                  💡 Pro Tip
                </p>
                <p className="text-xs text-zinc-300">
                  Have your fitness goals and current schedule ready for a more productive call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
