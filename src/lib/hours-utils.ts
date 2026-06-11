export const DAYS_ORDER = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export interface DayHours {
  open: string;
  close: string;
  closed: boolean;
}

export type WeeklyHours = Record<string, DayHours>;

export function parseWeeklyHours(hoursStr: string, defaultOpen = "08:00", defaultClose = "21:00"): WeeklyHours {
  try {
    if (hoursStr && hoursStr.trim().startsWith("{")) {
      const parsed = JSON.parse(hoursStr);
      const result: WeeklyHours = {};
      DAYS_ORDER.forEach((day) => {
        if (parsed[day]) {
          result[day] = {
            open: parsed[day].open || defaultOpen,
            close: parsed[day].close || defaultClose,
            closed: !!parsed[day].closed,
          };
        } else {
          result[day] = { open: defaultOpen, close: defaultClose, closed: false };
        }
      });
      return result;
    }
  } catch (e) {
    console.error("Failed to parse weekly hours, using default", e);
  }

  // Fallback: parse legacy "08:00 - 21:00" format
  let open = defaultOpen;
  let close = defaultClose;
  if (hoursStr && hoursStr.includes("-")) {
    const parts = hoursStr.split("-").map((s) => s.trim().replace(".", ":"));
    if (parts[0]) open = parts[0];
    if (parts[1]) close = parts[1];
  }

  const result: WeeklyHours = {};
  DAYS_ORDER.forEach((day) => {
    result[day] = { open, close, closed: false };
  });
  return result;
}

export function formatHoursSummary(hoursStr: string): string {
  if (!hoursStr) return "Jam tidak diatur";
  if (!hoursStr.trim().startsWith("{")) {
    return hoursStr;
  }

  try {
    const weekly = JSON.parse(hoursStr) as WeeklyHours;
    
    // Check if all closed
    const allClosed = Object.values(weekly).every((d) => d.closed);
    if (allClosed) return "Tutup";

    // Filter open days
    const openDays = Object.entries(weekly).filter(([_, d]) => !d.closed);
    if (openDays.length === 0) return "Tutup";

    const first = openDays[0][1];
    const allSame = openDays.every(([_, d]) => d.open === first.open && d.close === first.close);

    if (allSame) {
      const timeStr = `${first.open.replace(":", ".")} - ${first.close.replace(":", ".")}`;
      if (openDays.length === 7) {
        return `${timeStr} (Setiap Hari)`;
      } else {
        // e.g. "09.00 - 19.00 (Senin - Sabtu)"
        const openNames = openDays.map(([name]) => name);
        if (openNames.length === 6 && weekly["Minggu"]?.closed) {
          return `${timeStr} (Senin - Sabtu)`;
        }
        
        // Custom simple display
        return `${timeStr}`;
      }
    }

    // If they vary, show today's hours or Senin's hours
    const todayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday, ...
    const todayName = DAYS_ORDER[todayIndex];
    const todayHours = weekly[todayName];
    if (todayHours) {
      if (todayHours.closed) {
        return `Tutup (Hari ini)`;
      }
      return `${todayHours.open.replace(":", ".")} - ${todayHours.close.replace(":", ".")} (Hari ini)`;
    }
  } catch (e) {
    // fallback
  }
  return hoursStr;
}

export function isShopOpenNow(hoursStr: string, fallbackOpenTime: string, fallbackCloseTime: string): boolean {
  const now = new Date();
  
  if (hoursStr && hoursStr.trim().startsWith("{")) {
    try {
      const weekly = JSON.parse(hoursStr) as WeeklyHours;
      const todayIndex = now.getDay(); // 0 = Sunday, 1 = Monday, ...
      const todayName = DAYS_ORDER[todayIndex];
      const todayHours = weekly[todayName];
      if (!todayHours || todayHours.closed) {
        return false;
      }
      const [oh, om] = todayHours.open.split(":").map(Number);
      const [ch, cm] = todayHours.close.split(":").map(Number);
      const mins = now.getHours() * 60 + now.getMinutes();
      return mins >= oh * 60 + om && mins <= ch * 60 + cm;
    } catch (e) {
      // fallback
    }
  }

  // Fallback check
  const [oh, om] = fallbackOpenTime.split(":").map(Number);
  const [ch, cm] = fallbackCloseTime.split(":").map(Number);
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= oh * 60 + om && mins <= ch * 60 + cm;
}
