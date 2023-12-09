const Landing = ({onProgress}) => {
    return(
        <div className="bg-apricot-700 h-full w-full flex flex-col justify-center items-center gap-10 border-2 border-onyx rounded-lg text-center">
            <h1>Daily Astrology Readings ✨</h1>
            <h2>The secrets of the planets, delivered straight to your inbox 💌</h2>
            <button onClick={onProgress} className=" pt-4">
                Get Started 👈
            </button>
        </div>
    );
}
export default Landing;