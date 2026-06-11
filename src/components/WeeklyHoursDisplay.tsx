import { Clock } from "lucide-react";
import { parseWeeklyHours, DAYS_ORDER } from "@/lib/hours-utils";

interface WeeklyHoursDisplayProps {
  hours: string;
}

export const WeeklyHoursDisplay = ({ hours }: WeeklyHoursDisplayProps) => {
  const weekly = parseWeeklyHours(hours);
  const todayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday, ...
  const todayName = DAYS_ORDER[todayIndex];

  return (
    <div className="flex items-start gap-5 py-4 px-4 bg-secondary/30 rounded-2xl border border-border/50 max-w-sm">
      <div className="bg-primary/15 p-3 rounded-full shrink-0 flex items-center justify-center">
        <Clock className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 space-y-2.5">
        {DAYS_ORDER.map((day) => {
          const item = weekly[day];
          const isToday = day === todayName;
          return (
            <div
              key={day}
              className={`flex justify-between items-center py-0.5 transition-all duration-200 ${
                isToday
                  ? "font-bold text-primary bg-primary/10 px-2.5 py-1 -mx-2.5 rounded-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-sm">{day}</span>
              <span className="text-sm font-medium tabular-nums">
                {item.closed ? (
                  <span className="text-destructive font-semibold bg-destructive/10 px-2 py-0.5 rounded-md text-xs">
                    Tutup
                  </span>
                ) : (
                  `${item.open.replace(":", ".")} - ${item.close.replace(":", ".")}`
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyHoursDisplay;
