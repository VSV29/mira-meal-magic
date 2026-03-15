import { useState } from "react";
import { DAYS, type MealSlot } from "@/hooks/use-meal-plan";

type Props = {
  recipeName: string;
  onSelect: (day: string, slot: MealSlot) => void;
  onClose: () => void;
};

const slotLabels: Record<MealSlot, { label: string; emoji: string }> = {
  B: { label: "Breakfast", emoji: "🌅" },
  L: { label: "Lunch", emoji: "☀️" },
  D: { label: "Dinner", emoji: "🌙" },
};

const MealSlotPicker = ({ recipeName, onSelect, onClose }: Props) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/30" />
      <div
        className="relative w-full max-w-[390px] mx-auto bg-card rounded-t-2xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-3">
          <div className="w-8 h-1 bg-mm-gray/30 rounded-full" />
        </div>

        <h3 className="text-lg font-bold text-navy">Add to Meal Plan</h3>
        <p className="text-[12px] text-mm-gray mt-0.5 mb-3">
          Where should <strong>{recipeName}</strong> go?
        </p>

        {!selectedDay ? (
          <>
            <p className="text-[11px] font-bold text-mm-gray uppercase mb-2">Pick a day</p>
            <div className="grid grid-cols-4 gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className="h-12 rounded-xl bg-light-gray text-sm font-bold text-foreground active:scale-95 transition-transform hover:bg-saffron-light"
                >
                  {day}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-saffron text-[12px] font-semibold mb-2"
            >
              ← Change day
            </button>
            <p className="text-[11px] font-bold text-mm-gray uppercase mb-2">
              {selectedDay} — Pick a meal slot
            </p>
            <div className="space-y-2">
              {(["B", "L", "D"] as MealSlot[]).map((slot) => (
                <button
                  key={slot}
                  onClick={() => onSelect(selectedDay, slot)}
                  className="w-full flex items-center gap-3 bg-light-gray rounded-xl p-3 active:scale-[0.98] transition-transform hover:bg-saffron-light"
                >
                  <span className="text-2xl">{slotLabels[slot].emoji}</span>
                  <span className="text-sm font-bold text-foreground">
                    {slotLabels[slot].label}
                  </span>
                  <span className="ml-auto text-saffron text-sm font-bold">Select</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MealSlotPicker;
