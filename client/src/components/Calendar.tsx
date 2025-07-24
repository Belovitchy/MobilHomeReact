import type React from "react";

interface CalendarProps {
  year: number;
}

const Calendar: React.FC<CalendarProps> = ({ year }) => {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  console.log("nbr de jours", getDaysInMonth(0, 2025)); // 31

  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    // Ajustement pour commencer la semaine par lundi
    return firstDay === 0 ? 6 : firstDay - 1;
  };
  console.log("premier jour", getFirstDayOfMonth(0, 2025)); // 3 (pour Janvier 2025, le premier jour est un mercredi)

  const renderCalendar = () => {
    const calendar = [];

    for (let month = 0; month < 12; month++) {
      const daysInMonth = getDaysInMonth(month, year);
      const firstDayOfMonth = getFirstDayOfMonth(month, year);
      const monthRows = [];
      let week = [];

      // Ajouter des cellules vides pour les jours avant le premier jour du mois
      for (let i = 0; i < firstDayOfMonth; i++) {
        week.push(<td key={`empty-${i}`} />);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        week.push(
          <td
            className="bg-slate-300 text-center p-2 border border-slate-400"
            id={`${String(day).padStart(2, "0")}/${String(month + 1).padStart(2, "0")}/${year}`}
            key={day}
          >
            <div>{day}</div>
            <div className="flex flex-row ">
              <div className="bg-slate-400 min-w-[22px]">m</div>
              <div className="bg-slate-400 min-w-[22px]">a</div>
            </div>
          </td>,
        );

        if (week.length === 7) {
          monthRows.push(<tr key={`${month}-${day}`}>{week}</tr>);
          week = [];
        }
      }

      // Ajouter des cellules vides pour compléter la dernière semaine
      if (week.length > 0) {
        while (week.length < 7) {
          week.push(<td key={`empty-end-${week.length}`} />);
        }
        monthRows.push(<tr key={`${month}-last`}>{week}</tr>);
      }

      calendar.push(
        <div key={month}>
          <h2>
            {months[month]} {year}
          </h2>
          <table>
            <thead>
              <tr>
                <th>Lun</th>
                <th>Mar</th>
                <th>Mer</th>
                <th>Jeu</th>
                <th>Ven</th>
                <th>Sam</th>
                <th>Dim</th>
              </tr>
            </thead>
            <tbody>{monthRows}</tbody>
          </table>
        </div>,
      );
    }

    return calendar;
  };

  return <div>{renderCalendar()}</div>;
};

export default Calendar;
