type ErrorNoticeProps = {
  message: string;
  action?: React.ReactNode;
};

export function ErrorNotice({ message, action }: ErrorNoticeProps) {
  return (
    <div className="w-full rounded-[28px] bg-white/85 p-5 text-center shadow-card ring-1 ring-rose/70">
      <p className="text-sm font-medium leading-6 text-berry">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
