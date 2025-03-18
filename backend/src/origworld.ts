import { RatioType } from './graphql';

export const origworld = {
  name: 'A Nice World 2',
  logo: 'icones/ecolo.jpg',
  money: 0,
  score: 0,
  totalangels: 0,
  activeangels: 0,
  angelbonus: 2,
  lastupdate: 0,
  products: [
    {
      id: 1,
      name: 'Velociraptor Training',
      logo: 'icones/velociraptor.jpg',
      cout: 5,
      croissance: 1.07,
      revenu: 2,
      vitesse: 1000,
      quantite: 1,
      timeleft: 0,
      managerUnlocked: false,
      paliers: [
        {
          name: 'Speedy Raptors!',
          logo: '/raptor1.png',
          seuil: 20,
          idcible: 1,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false,
        },
        {
          name: 'Ultimate Pack Hunting!',
          logo: '/raptor1.png',
          seuil: 75,
          idcible: 1,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false,
        },
      ],
    },
    {
      id: 2,
      name: 'Triceratops Farm',
      logo: '/Triceratops1.png',
      cout: 50,
      croissance: 1.15,
      revenu: 80,
      vitesse: 3000,
      quantite: 0,
      timeleft: 0,
      managerUnlocked: false,
      paliers: [
        {
          name: 'Strong Horns!',
          logo: '/Triceratops1.png',
          seuil: 20,
          idcible: 2,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false,
        },
        {
          name: 'Tricera Rampage!',
          logo: '/Triceratops1.png',
          seuil: 75,
          idcible: 2,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false,
        },
      ],
    },
    {
      id: 3,
      name: 'Spinosaurus Aviary',
      logo: '/spino1.png',
      cout: 250,
      croissance: 1.12,
      revenu: 300,
      vitesse: 5000,
      quantite: 0,
      timeleft: 0,
      managerUnlocked: false,
      paliers: [
        {
          name: 'Faster Wings!',
          logo: '/spino1.png',
          seuil: 20,
          idcible: 3,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false,
        },
      ],
    },
    {
      id: 4,
      name: 'Tyrannosaurus Rex Pen',
      logo: '/trex1.png',
      cout: 1000,
      croissance: 1.1,
      revenu: 1000,
      vitesse: 10000,
      quantite: 0,
      timeleft: 0,
      managerUnlocked: false,
      paliers: [
        {
          name: 'Bigger Bite!',
          logo: '/trex1.png',
          seuil: 20,
          idcible: 4,
          ratio: 2,
          typeratio: RatioType.gain,
          unlocked: false,
        },
      ],
    },
    {
      id: 5,
      name: 'Diplodocus Sanctuary',
      logo: '/diplo1.png',
      cout: 5000,
      croissance: 1.09,
      revenu: 5000,
      vitesse: 20000,
      quantite: 0,
      timeleft: 0,
      managerUnlocked: false,
      paliers: [],
    },
    {
      id: 6,
      name: 'Mosasaurus Lagoon',
      logo: '/mausasaurus1.png',
      cout: 20000,
      croissance: 1.08,
      revenu: 20000,
      vitesse: 60000,
      quantite: 0,
      timeleft: 0,
      managerUnlocked: false,
      paliers: [],
    },
  ],
  allunlocks: [
    {
      name: 'Jurassic Domination',
      logo: '/LaFete.jpg',
      seuil: 30,
      idcible: 0,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Prehistoric Acceleration',
      logo: '/LaFete.jpg',
      seuil: 75,
      idcible: 0,
      ratio: 2,
      typeratio: RatioType.vitesse,
      unlocked: false,
    },
    {
      name: 'Dino Overlord',
      logo: '/LaFete.jpg',
      seuil: 150,
      idcible: 0,
      ratio: 3,
      typeratio: RatioType.gain,
      unlocked: false,
    },
  ],

  upgrades: [
    {
      name: 'Raptor Frenzy',
      logo: '/raptor1.png',
      seuil: 500,
      idcible: 1,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Sharp Claws',
      logo: '/raptor1.png',
      seuil: 1500,
      idcible: 1,
      ratio: 3,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Raptor Speed',
      logo: '/raptor1.png',
      seuil: 3000,
      idcible: 1,
      ratio: 2,
      typeratio: RatioType.vitesse,
      unlocked: false,
    },

    // Triceratops
    {
      name: 'Horned Charge',
      logo: '/Triceratops1.png',
      seuil: 2000,
      idcible: 2,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Tricera Bash',
      logo: '/Triceratops1.png',
      seuil: 6000,
      idcible: 2,
      ratio: 3,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Fast Horns',
      logo: '/Triceratops1.png',
      seuil: 10000,
      idcible: 2,
      ratio: 2,
      typeratio: RatioType.vitesse,
      unlocked: false,
    },

    // Spinosaurus
    {
      name: 'Spino Bite',
      logo: '/spino1.png',
      seuil: 5000,
      idcible: 3,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Spino Rage',
      logo: '/spino1.png',
      seuil: 15000,
      idcible: 3,
      ratio: 3,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Aquatic Speed',
      logo: '/spino1.png',
      seuil: 25000,
      idcible: 3,
      ratio: 2,
      typeratio: RatioType.vitesse,
      unlocked: false,
    },

    // T-Rex
    {
      name: 'T-Rex Roar',
      logo: '/trex1.png',
      seuil: 20000,
      idcible: 4,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'T-Rex Rampage',
      logo: '/trex1.png',
      seuil: 60000,
      idcible: 4,
      ratio: 3,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'T-Rex Speed',
      logo: '/trex1.png',
      seuil: 100000,
      idcible: 4,
      ratio: 2,
      typeratio: RatioType.vitesse,
      unlocked: false,
    },

    // Diplodocus
    {
      name: 'Diplo Strength',
      logo: 'diplo1.png',
      seuil: 50000,
      idcible: 5,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Diplo Charge',
      logo: 'diplo1.png',
      seuil: 150000,
      idcible: 5,
      ratio: 3,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Diplo Sprint',
      logo: 'diplo1.png',
      seuil: 200000,
      idcible: 5,
      ratio: 2,
      typeratio: RatioType.vitesse,
      unlocked: false,
    },

    // Mosasaurus
    {
      name: 'Mosa Bite',
      logo: 'icones/mausasaurus1.png',
      seuil: 100000,
      idcible: 6,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Mosa Rampage',
      logo: 'icones/mausasaurus1.png',
      seuil: 300000,
      idcible: 6,
      ratio: 3,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Mosa Speed',
      logo: 'icones/mausasaurus1.png',
      seuil: 500000,
      idcible: 6,
      ratio: 2,
      typeratio: RatioType.vitesse,
      unlocked: false,
    },
  ],
  angelupgrades: [
    // Velociraptor
    {
      name: 'Raptor Angel Blessing',
      logo: '/raptor1.png',
      seuil: 50,
      idcible: 1,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Raptor Speed Spirit',
      logo: '/raptor1.png',
      seuil: 100,
      idcible: 1,
      ratio: 2,
      typeratio: RatioType.vitesse,
      unlocked: false,
    },
    {
      name: 'Raptor Angelic Aura',
      logo: '/raptor1.png',
      seuil: 150,
      idcible: 1,
      ratio: 1,
      typeratio: RatioType.ange,
      unlocked: false,
    },

    // Triceratops
    {
      name: 'Tricera Angel Strength',
      logo: '/Triceratops1.png',
      seuil: 60,
      idcible: 2,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Tricera Divine Rush',
      logo: '/Triceratops1.png',
      seuil: 120,
      idcible: 2,
      ratio: 2,
      typeratio: RatioType.vitesse,
      unlocked: false,
    },
    {
      name: 'Tricera Sacred Horn',
      logo: '/Triceratops1.png',
      seuil: 180,
      idcible: 2,
      ratio: 1,
      typeratio: RatioType.ange,
      unlocked: false,
    },

    // Spinosaurus
    {
      name: 'Spino Angel Claws',
      logo: '/spino1.png',
      seuil: 80,
      idcible: 3,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Spino Aquatic Blessing',
      logo: '/spino1.png',
      seuil: 150,
      idcible: 3,
      ratio: 2,
      typeratio: RatioType.vitesse,
      unlocked: false,
    },
    {
      name: 'Spino Holy Predator',
      logo: '/spino1.png',
      seuil: 200,
      idcible: 3,
      ratio: 1,
      typeratio: RatioType.ange,
      unlocked: false,
    },

    // T-Rex
    {
      name: 'T-Rex Divine Roar',
      logo: '/trex1.png',
      seuil: 100,
      idcible: 4,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'T-Rex Sacred Fury',
      logo: '/trex1.png',
      seuil: 200,
      idcible: 4,
      ratio: 2,
      typeratio: RatioType.vitesse,
      unlocked: false,
    },
    {
      name: 'T-Rex Angelic Might',
      logo: '/trex1.png',
      seuil: 300,
      idcible: 4,
      ratio: 1,
      typeratio: RatioType.ange,
      unlocked: false,
    },

    // Diplodocus
    {
      name: 'Diplo Angel Boost',
      logo: 'diplo1.png',
      seuil: 150,
      idcible: 5,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Diplo Sacred Path',
      logo: 'diplo1.png',
      seuil: 250,
      idcible: 5,
      ratio: 2,
      typeratio: RatioType.vitesse,
      unlocked: false,
    },
    {
      name: 'Diplo Ancient Blessing',
      logo: 'diplo1.png',
      seuil: 350,
      idcible: 5,
      ratio: 1,
      typeratio: RatioType.ange,
      unlocked: false,
    },

    // Mosasaurus
    {
      name: 'Mosa Angel Rage',
      logo: 'icones/mausasaurus1.png',
      seuil: 250,
      idcible: 6,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Mosa Divine Swiftness',
      logo: 'icones/mausasaurus1.png',
      seuil: 400,
      idcible: 6,
      ratio: 2,
      typeratio: RatioType.vitesse,
      unlocked: false,
    },
    {
      name: 'Mosa Sacred Waters',
      logo: 'icones/mausasaurus1.png',
      seuil: 500,
      idcible: 6,
      ratio: 1,
      typeratio: RatioType.ange,
      unlocked: false,
    },
  ],

  managers: [
    {
      name: 'Dr. Alan Grant',
      logo: '/m2.png',
      seuil: 50,
      idcible: 1,
      ratio: 0,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'John Hammond',
      logo: '/m1.png',
      seuil: 15000,
      idcible: 2,
      ratio: 0,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Owen Grady',
      logo: '/m3.png',
      seuil: 30000,
      idcible: 3,
      ratio: 0,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Dr. Ellie Sattler',
      logo: '/m4.png',
      seuil: 60000,
      idcible: 4,
      ratio: 0,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Claire Dearing',
      logo: '/m5.png',
      seuil: 120000,
      idcible: 5,
      ratio: 0,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Dr. Ian Malcolm',
      logo: '/m6.png',
      seuil: 250000,
      idcible: 6,
      ratio: 0,
      typeratio: RatioType.gain,
      unlocked: false,
    },
  ],
};
