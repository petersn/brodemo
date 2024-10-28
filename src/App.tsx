import React from 'react';
import ReactDOM from 'react-dom';

type Faction = 'floopies' | 'wizwoz' | 'gazimbotron';

interface Card {
  name: string;
  faction: Faction;
  mainText: string;
  atk: number;
  def: number;
}

// I asked Claude 3.5 Sonnet to generate these cards given the above definitions.
// It's so funny how good LLMs are for generating placeholder stuff these days.

const CARD_POOL: Card[] = [
  // Floopies - Focus on balanced stats and straightforward effects
  {
    name: 'Floopie Grunt',
    faction: 'floopies',
    mainText: 'Just a grunt.',
    atk: 1,
    def: 2,
  },
  {
    name: 'Floopie Captain',
    faction: 'floopies',
    mainText: 'Leader of the grunts.',
    atk: 3,
    def: 3,
  },
  {
    name: 'Mega Floopie',
    faction: 'floopies',
    mainText: 'The biggest of the Floopies.',
    atk: 5,
    def: 5,
  },
  {
    name: 'Sneaky Floopie',
    faction: 'floopies',
    mainText: 'Quick and agile.',
    atk: 3,
    def: 1,
  },
  {
    name: 'Floopie Shield Bearer',
    faction: 'floopies',
    mainText: 'Protector of the realm.',
    atk: 1,
    def: 5,
  },
  {
    name: 'Floopie Elder',
    faction: 'floopies',
    mainText: 'Ancient wisdom incarnate.',
    atk: 2,
    def: 4,
  },
  
  // Wizwoz - Focus on high attack, lower defense
  {
    name: 'Apprentice Wizwoz',
    faction: 'wizwoz',
    mainText: 'Still learning the arts.',
    atk: 2,
    def: 1,
  },
  {
    name: 'Wizwoz Pyromancer',
    faction: 'wizwoz',
    mainText: 'Master of flames.',
    atk: 4,
    def: 2,
  },
  {
    name: 'Grand Wizwoz',
    faction: 'wizwoz',
    mainText: 'Leader of the magical order.',
    atk: 6,
    def: 3,
  },
  {
    name: 'Wizwoz Illusionist',
    faction: 'wizwoz',
    mainText: 'Now you see them...',
    atk: 3,
    def: 2,
  },
  {
    name: 'Dark Wizwoz',
    faction: 'wizwoz',
    mainText: 'Practitioner of forbidden arts.',
    atk: 5,
    def: 1,
  },
  {
    name: 'Wizwoz Scholar',
    faction: 'wizwoz',
    mainText: 'Knowledge is power.',
    atk: 2,
    def: 2,
  },
  
  // Gazimbotron - Focus on high defense, mechanical themes
  {
    name: 'Gazimbot Scout',
    faction: 'gazimbotron',
    mainText: 'Scanning perimeter.',
    atk: 1,
    def: 3,
  },
  {
    name: 'Gazimbot Defender',
    faction: 'gazimbotron',
    mainText: 'Shields at maximum.',
    atk: 2,
    def: 6,
  },
  {
    name: 'Supreme Gazimbotron',
    faction: 'gazimbotron',
    mainText: 'Ultimate mechanical evolution.',
    atk: 4,
    def: 7,
  },
  {
    name: 'Gazimbot Repair Unit',
    faction: 'gazimbotron',
    mainText: 'Self-maintenance protocols active.',
    atk: 1,
    def: 4,
  },
  {
    name: 'Gazimbot Artillery',
    faction: 'gazimbotron',
    mainText: 'Long-range elimination protocols.',
    atk: 3,
    def: 5,
  },
  {
    name: 'Ancient Gazimbotron',
    faction: 'gazimbotron',
    mainText: 'From the first generation.',
    atk: 2,
    def: 8,
  },
  {
    name: 'Gazimbot Sentinel',
    faction: 'gazimbotron',
    mainText: 'Always vigilant.',
    atk: 3,
    def: 6,
  },
];

function StatCircle(props: { value: number, right: number, bottom: number }) {
  return (
    <div style={{
      // The way you make a circle is by making a square, and setting the border-radius to half the width.
      width: 30,
      height: 30,
      borderRadius: '50%',
      border: '1px solid black',
      backgroundColor: '#f0f0f0',
      // This awfulness is just to center the text in the circle.
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: props.right,
      bottom: props.bottom,
      // Prevent selection of the text inside the circle.
      userSelect: 'none',
    }}>
      {props.value}
    </div>
  );
}

function Card(props: { card: Card }) {
  let backgroundColor = '';
  if (props.card.faction === 'floopies') {
    backgroundColor = 'lightblue';
  }
  if (props.card.faction === 'wizwoz') {
    backgroundColor = 'lightgreen';
  }
  if (props.card.faction === 'gazimbotron') {
    backgroundColor = 'lightgrey';
  }
  return (
    <div style={{
      width: 200,
      height: 300,
      padding: 10,
      border: '1px solid black',
      borderRadius: 5,
      backgroundColor,
      // The `position: relative` allows us to place things at exact pixel positions relative to this div.
      // We use this for the attack and defense numbers.
      position: 'relative',
    }}>
      <div style={{
        fontWeight: 'bold',
        fontSize: 20,
      }}>{props.card.name}</div>
      <p style={{
        // This placement always starts the card text 200px down from the top.
        position: 'absolute',
        top: 180,
      }}>{props.card.mainText}</p>
      {/* We put attack and defense in little circles in the bottom left and bottom right. */}
      <StatCircle value={props.card.atk} right={10} bottom={10} />
      <StatCircle value={props.card.def} right={50} bottom={10} />
    </div>
  );
}

const EMPTY_DECK: { [cardName: string]: number } = {};
for (const card of CARD_POOL) {
  EMPTY_DECK[card.name] = 0;
}

function App(props: {}) {
  const [selectedFaction, setSelectedFaction] = React.useState<Faction>('floopies');
  const [deckComposition, setDeckComposition] = React.useState<{ [cardName: string]: number }>({ ...EMPTY_DECK });

  const cardList = [];
  let index = 0;
  for (const card of CARD_POOL) {
    // Check if the card is valid. For now we just check faction.
    const isSelectable = card.faction === selectedFaction;
    const canAdd = deckComposition[card.name] < 3 && isSelectable;
    const canRemove = deckComposition[card.name] > 0;

    // If the card is for the wrong faction, and we have some of it, remove those immediately!
    if (deckComposition[card.name] > 0 && !isSelectable) {
      setDeckComposition({
        ...deckComposition,
        [card.name]: 0,
      });
    }

    cardList.push(<div style={{
      // This div with a margin of 20 pixels around each card spaces them out a bit.
      margin: 20,
      opacity: isSelectable ? 1 : 0.3,
    }}>
      <Card key={index} card={card} />
      {/* Make two little buttons to add and remove the card from the deck. */}
      <button disabled={!canAdd} onClick={() => {
        if (isSelectable) {
          setDeckComposition({
            ...deckComposition,
            [card.name]: deckComposition[card.name] + 1,
          });
        }
      }}>Add to deck</button>
      <button disabled={!canRemove} onClick={() => {
        if (deckComposition[card.name] > 0) {
          setDeckComposition({
            ...deckComposition,
            [card.name]: deckComposition[card.name] - 1,
          });
        }
      }}>Remove from deck</button>
      <div>Count: {deckComposition[card.name]}</div>
    </div>);
    index++;
  }

  const deckList = [];
  for (const cardName in deckComposition) {
    if (deckComposition[cardName] > 0) {
      deckList.push(<li key={cardName}>{cardName} x{deckComposition[cardName]}</li>);
    }
  }

  return (
    <div style={{
      // Stay 10 pixels away from the edges of the screen.
      padding: 10,
    }}>
      {/* Here we draw the deck composition. */}
      <h2>Deck:</h2>
      <ul style={{
        margin: 20,
        padding: 10,
        height: 200,
        width: 600,
        overflowY: 'scroll',
        backgroundColor: '#f0f0f0',
        border: '1px solid black',
      }}>
        {deckList}
      </ul>

      {/* Here we draw the faction selection buttons. */}
      <h2>Faction Selection:</h2>
      <div>
        <button
          disabled={selectedFaction === 'floopies'}
          onClick={() => setSelectedFaction('floopies')}
        >
          Floopies
        </button>
        <button
          disabled={selectedFaction === 'wizwoz'}
          onClick={() => setSelectedFaction('wizwoz')}
        >
          Wizwoz
        </button>
        <button
          disabled={selectedFaction === 'gazimbotron'}
          onClick={() => setSelectedFaction('gazimbotron')}
        >
          Gazimbotron
        </button>
      </div>

      {/* Here we draw the main pool of cards. */}
      <h2>Card Pool:</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cardList}
      </div>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
