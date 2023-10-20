const keyCard2 = (title, img, des) => {
  return (
    <>
      <div className="rounded-lg border-[2px] dark">
        <span className="text-[20px]">{title}</span>
        <span className="text-[16px]">{des}</span>
      </div>
    </>
  );
};
export default keyCard2;
