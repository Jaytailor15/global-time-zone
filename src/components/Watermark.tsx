const Watermark = () => {
  return (
    <div className="fixed bottom-1/2 right-[-50px] rotate-90 translate-y-1/2 z-50 bg-black text-white p-1 shadow-lg opacity-60">
      <span className="text-xs mr-1"></span>
      <span className="text-xs">Designed by</span>
      <span className="text-xs font-extrabold mx-1">Jay Tailor</span>
      <span className="text-xs mr-1"></span>
    </div>
  );
};

export default Watermark; 