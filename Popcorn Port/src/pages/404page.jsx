import img from '../assets/no-results.png'

const errorMessages = [
  "The Page You're Looking For is in Another Cinematic Universe!",
  "Sorry, but this page went on a secret mission with Ethan Hunt!",
  "The Avengers couldn't assemble this page!",
  "You've reached the end of the movie universe. Time to rewind and try again!",
  "The page was too fast and furious, and we couldn't catch it!"
];

const NoPage = () => {
  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * errorMessages.length);
    return errorMessages[randomIndex];
  };

  return (
    <div className="h-screen flex justify-center flex-col items-center text-white">
      <img src={img} className='w-[150px] h-[150px]' alt="" />
      <h1 className="text-3xl font-bold ">404 Page Not Found</h1>
      <p className="text-xl mt-2 text-center">{getRandomMessage()}</p>
    </div>
  );
};

export default NoPage;
