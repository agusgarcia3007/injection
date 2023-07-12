import { classNames } from "../helpers/classNames";

const Container = ({ children, col }) => {
  return (
    <main className={classNames("p-5 flex", col ? "flex-col" : "flex-row")}>
      {children}
    </main>
  );
};

export default Container;
