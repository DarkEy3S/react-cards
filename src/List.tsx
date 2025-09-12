import {} from "react";

interface ListProps {
  task: string;
  icon: string;
  isCompact: boolean;
}

const items: ListProps[] = [
  {
    task: "Выучить Реакт",
    icon: "🍏",
    isCompact: false,
  },
  {
    task: "Закрепить JS",
    icon: "🍏",
    isCompact: true,
  },
  {
    task: "Не забивать на английский",
    icon: "🍏",
    isCompact: true,
  },
];

export const List = () => {
  return (
    <div className="card">
      {items.map((item, index) => {
        return (
          <section key={index} className={item.isCompact ? "completed" : ""}>
            <span>{item.icon}</span>
            <h4>{item.task}</h4>
          </section>
        );
      })}
    </div>
  );
};
