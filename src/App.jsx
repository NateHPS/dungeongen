import { useState } from "react";

const ROOM_DATA = [
  "A faint smell of ozone and burnt sugar.",
  "The air is unnaturally heavy, as if underwater, though dry.",
  "A pool of perfectly still, pitch-black water that reflects nothing.",
  "Footprints in the dust that abruptly stop, mid-stride.",
  "The air shimmers distorting distant objects, as if seen through heat haze.",
  "The air smells faintly of old spices and distant rain.",
  "The floor is unusually warm to the touch in patches, then abruptly cold.",
  "The sound of slow, heavy breathing, but no visible source.",
  "The faint scent of stagnant water and mildewed cloth.",
  "The air carries a faint, sickly sweet scent, reminiscent of rotting fruit.",
  "Walls inscribed with a repeating, silent, screaming face.",
  "A single, glowing, floating eyeball with no discernible iris.",
  "Chains hanging from the ceiling, coated in a thick, iridescent slime.",
  "A pedestal holding a half-eaten, petrified loaf of bread.",
  "Cobwebs thick with iridescent dust that shimmers in faint light.",
  "A broken hourglass, its sand replaced with tiny, glittering gears.",
  "Carvings of stylized, multi-limbed insects adorning the lintels.",
  "A discarded, rusted music box playing a tune too slow to recognize.",
  "Stone pillars draped with thin, translucent, dried skin-like material.",
  "A single, withered flower, perfectly preserved in a cube of clear amber.",
  "A massive coiled serpent sleeps curled about a nest of 2d4 eggs.",
  "2d6 goblins take turns throwing pebbles at a chained manticore.",
  "2d6 bandits lounge about a ragged camp. Two dead bandits lie in a corner.",
  "An ogre in a powdered wig holds a large crude wooden mallet. It calls itself The Judge.",
  "3d6 barrels of pickles. One barrel contains the body of a pickled wizard with a ring of levitation.",
  "2d6 dead goblins with flickering crystal growths bursting from sores on their bodies.",
  "A giant raven skeleton arranged in a natural looking pose. A plaque in a goblin language reads \"The queen’s favorite bird. Slain by Hank.\"",
  "Four humans with crowbars try to pry a large gemstone from a stone wall. They don’t know it holds back a torrent of magma.",
  "2d6 troglodytes roast a fat slug over a fire.",
  "2d6 slugs crawl over a pile of human bones, eating any remaining flesh."
];

function getRandomRooms(count = 5, lockedIndices = [], currentRooms = []) {
  const unlockedIndices = Array.from({ length: currentRooms.length }, (_, i) => i).filter(i => !lockedIndices.includes(i));
  const availableRooms = ROOM_DATA.filter(room => !currentRooms.includes(room));
  const shuffled = [...availableRooms].sort(() => 0.5 - Math.random());

  const newRooms = [...currentRooms];
  for (let i = 0, j = 0; i < currentRooms.length && j < shuffled.length; i++) {
    if (!lockedIndices.includes(i)) {
      newRooms[i] = shuffled[j++];
    }
  }

  return newRooms;
}

export default function App() {
  const initialRooms = Array.from({ length: 5 }, () => ROOM_DATA[Math.floor(Math.random() * ROOM_DATA.length)]);
  const [rooms, setRooms] = useState(initialRooms);
  const [locked, setLocked] = useState([]);

  const toggleLock = (index) => {
    setLocked((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const generateRooms = () => {
    setRooms((prevRooms) => getRandomRooms(5, locked, prevRooms));
  };

  return (
    <div>
      <h1>Dungeon Room Generator</h1>
      <button onClick={generateRooms}>Generate New Rooms</button>
      {rooms.map((room, index) => (
        <div key={index} style={{ border: locked.includes(index) ? '2px solid red' : '1px solid gray', marginBottom: '10px', padding: '10px' }}>
          <p><strong>{index + 1}.</strong> {room}</p>
          <button onClick={() => toggleLock(index)}>{locked.includes(index) ? 'Unlock' : 'Lock'}</button>
        </div>
      ))}
    </div>
  );
}
