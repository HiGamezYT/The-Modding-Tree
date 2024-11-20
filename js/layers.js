addLayer("d", {
    name: "dice", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🎲", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        random: new Decimal(0),
        display: new Decimal(0),
        cooldown: new Decimal(0),
        cb: new Decimal(25),
        maxr: new Decimal(7),
        db: new Decimal(1),
        minr: new Decimal(0),
        golddice: new Decimal(0),
        rolled: new Decimal(0),
        goldboost: new Decimal(1),
        req: new Decimal(25),
        ba: new Decimal(0.5),
        cpre: new Decimal(0),
        reqr: new Decimal(25),
        rainbowdice: new Decimal(0),
        rainbowboost: new Decimal(1),
        rolls: new Decimal(0),
        casho: new Decimal(1)
    }},
    color: "#757575",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "", // Name of prestige currency
    baseResource: "cash", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update(diff) {
        if (player.d.rolled.gte(player.d.req)) player.d.rolled = new Decimal(0) , player.d.golddice = player.d.golddice.add(1) , player.d.goldboost = player.d.goldboost.add(player.d.ba)
        if (player.d.golddice.gte(player.d.reqr)) player.d.golddice = player.d.golddice.sub(player.d.reqr) , player.d.rainbowdice = player.d.rainbowdice.add(1) , player.d.rainbowboost = player.d.rainbowboost.add(1)
        player.d.cooldown = player.d.cooldown.add(1)
        if (player.d.cooldown == player.d.cb) player.d.cooldown = new Decimal(player.d.cb)
        if (hasUpgrade("d",61)) clickClickable("d",13)
        if (hasUpgrade("d",61)) clickClickable("d",12)
        if (hasUpgrade("d",61)) clickClickable("d",11)
        if (hasUpgrade("r",65)) player.d.casho = Decimal.floor(player.r.power.log10(player.r.power))
        },
        automate(){return hasUpgrade("d",11)},
    row: "side", // Row the layer is in on the tree (0 is the first row)
    
    layerShown(){return true},
    tabFormat: {
        "Rolling": {
            content: [
                ["display-text",
                    function() {return 'You have ' + format(player.points) + ' Cash'},
                    {"color": "green" , "font-size": "18px"}],
                    ["display-text",
                        function() {return 'You have rolled the die ' + format(player.d.rolls) + ' times'},
                        {"color": "gray" , "font-size": "18px"}],
                    "blank",
                    ["row",[["clickable",11],["clickable",12],["clickable",13]]]
            ],
           
        },
        "Dice Upgrades": {
            content: [
                ["row",[["upgrade",11],["upgrade",12],["upgrade",13],["upgrade",14],["upgrade",15]]],
                ["row",[["upgrade",21],["upgrade",22],["upgrade",23],["upgrade",24],["upgrade",25]]],
                ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34],["upgrade",35]]],
                ["row",[["upgrade",41],["upgrade",42],["upgrade",43],["upgrade",44],["upgrade",45]]],
                ["row",[["upgrade",51],["upgrade",52],["upgrade",53],["upgrade",54],["upgrade",55]]],
                ["row",[["upgrade",61]]],
                ["row",[["upgrade",71],["upgrade",72],["upgrade",73],["upgrade",74],["upgrade",75]]],
                ["row",[["upgrade",81],["upgrade",82],["upgrade",83],["upgrade",84],["upgrade",85]]],
            ]
        },
        "Golden Dice": {
            content: [
                ["display-text",
                    function() {return 'Each ' + format(player.d.req) +  ' rolls you get a golden dice which will give you a boost'},
                    {"color": "gold" , "font-size": "23px"}],
             ["display-text",
                   function() {return 'You have ' + format(player.d.golddice) + ' Gold Dice'},
                        {"color": "gold" , "font-size": "18px"}],
            ["display-text",
                 function() {return 'Boost:   x' + format(player.d.goldboost)},
                            {"color": "gold" , "font-size": "18px"}],
                            "blank",
                        ["row",[["upgrade",301],["upgrade",302],["upgrade",303],["upgrade",304],["upgrade",305]]]
            ],
            unlocked() {return hasUpgrade('d',25)},
            buttonStyle: {"border-color": "gold"},
        },
        "Rainbow Dice": {
            content: [
                ["display-text",
                    function() {return 'Each ' + format(player.d.reqr) +  ' rolls you get a rainbow dice which will give you a boost'},
                    {"color": "red" , "font-size": "23px"}],
                    ["display-text",
                        function() {return 'You have ' + format(player.d.rainbowdice) + ' Rainbow Dice'},
                             {"color": "orange" , "font-size": "18px"}],
                             ["display-text",
                                function() {return 'Boost:   x' + format(player.d.rainbowboost)},
                                           {"color": "yellow" , "font-size": "18px"}],
   ["row",[["upgrade",601],["upgrade",602],["upgrade",603],["upgrade",604],["upgrade",605]]],
            ],
            buttonStyle: {
                "border-color": "red"
            },
            unlocked() {return hasUpgrade('d',61)},
        },
        
    },
    upgrades: {
        11: {
            title: "Cool",
            description: "Decrease cooldown from 25 -> 24",
            cost: new Decimal(50),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.cb = new Decimal(24)
            },
        },
        12: {
            title: "The 7th dice is real",
            description: "You can now roll a 7 ",
            cost: new Decimal(50),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.maxr = new Decimal(8)
            },
        },
        13: {
            title: "Cooler",
            description: "Decrease cooldown to 24 -> 23 ",
            cost: new Decimal(75),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.cb = new Decimal(23)
            },
        },
        14: {
            title: "Multiplier",
            description: "Get a x1.25 boost from getting cash from dice",
            cost: new Decimal(100),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.db = new Decimal(1.25)
            },
        },
        15: {
            title: "Coolest",
            description: "Decrease cooldown from 23 -> 22",
            cost: new Decimal(125),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.cb = new Decimal(22)
            },
        },
        21: {
            title: "Cooler Cool",
            description: "Decrease cooldown from 22 -> 21",
            cost: new Decimal(150),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.cb = new Decimal(21)
            },
        },
        22: {
            title: "Powerful",
            description: "Rolling dice multi is now x1.5",
            cost: new Decimal(180),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.db = new Decimal(1.5)
            },
        },
        23: {
            title: "Even Better",
            description: "Rolling dice multi is now x2",
            cost: new Decimal(300),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.db = new Decimal(2)
            },
        },
        24: {
            title: "EIGHT",
            description: "Unlock the ability to roll an eight on the dice",
            cost: new Decimal(300),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.maxr = new Decimal(9)
            },
        },
        25: {
            title: "Golden",
            description: "Unlock golden dice",
            cost: new Decimal(300),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.maxr = new Decimal(9)
            },
        },
        31: {
            title: "Cooler Cooler",
            description: "Decrease cooldown from 21 -> 20",
            cost: new Decimal(560),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.cb = new Decimal(20)
            },
            unlocked() {return (hasUpgrade("d", 25))},
        },
        32: {
            title: "Multi boost",
            description: "Rolling dice multi is x2.5",
            cost: new Decimal(560),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.db = new Decimal(2.5)
            },
            unlocked() {return (hasUpgrade("d", 25))},
        },
        33: {
            title: "Nine",
            description: "You can now roll a 9",
            cost: new Decimal(750),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.maxr = new Decimal(10)
            },
            unlocked() {return (hasUpgrade("d", 25))},
        },
        34: {
            title: "TEN!",
            description: "You can now roll a 10",
            cost: new Decimal(1100),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.maxr = new Decimal(11)
            },
            unlocked() {return (hasUpgrade("d", 25))},
        },
        35: {
            title: "Multi Booster Multi",
            description: "Dice multi is now x3",
            cost: new Decimal(1500),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.db = new Decimal(3)
            },
            unlocked() {return (hasUpgrade("d", 25))},
        },
        41: {
            title: "Better Multi Multi",
            description: "Dice multi is now x4",
            cost: new Decimal(8500),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.db = new Decimal(4)
            },
            unlocked() {return (hasUpgrade("d", 35))},
        },
        42: {
            title: "The more the merrier",
            description: "Unlock the tier 2 dice (Addition x1.25 boost)",
            cost: new Decimal(2.5e4),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            unlocked() {return (hasUpgrade("d", 35))},
        },
        43: {
            title: "Eleven",
            description: "You can now roll an eleven",
            cost: new Decimal(3e4),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.maxr = new Decimal(12)
            },
            unlocked() {return (hasUpgrade("d", 35))},
        },
        44: {
            title: "12",
            description: "You can now roll a 12",
            cost: new Decimal(4e4),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.maxr = new Decimal(13)
            },
            unlocked() {return (hasUpgrade("d", 35))},
        },
        45: {
            title: "Better Better Multi",
            description: "Dice multi is now x6",
            cost: new Decimal(5e4),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.db = new Decimal(6)
            },
            unlocked() {return (hasUpgrade("d", 35))},
        },
        51: {
            title: "Super Multi",
            description: "Dice multi is now x10",
            cost: new Decimal(6e4),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.db = new Decimal(10)
            },
            unlocked() {return (hasUpgrade("d", 45))},
        },
        52: {
            title: "13",
            description: "You can now roll a 13",
            cost: new Decimal(6.25e4),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.maxr = new Decimal(14)
            },
            unlocked() {return (hasUpgrade("d", 45))},
        },
        53: {
            title: "Prominent Rolling",
            description: "Unlock the tier 3 dice",
            cost: new Decimal(7e4),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            unlocked() {return (hasUpgrade("d", 45))},
        },
        54: {
            title: "14",
            description: "You can now roll a 14",
            cost: new Decimal(1e5),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.maxr = new Decimal(15)
            },
            unlocked() {return (hasUpgrade("d", 45))},
        },
        55: {
            title: "THE ICE",
            description: "Dice Cooldown 20 -> 19",
            cost: new Decimal(1.1e5),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.cb = new Decimal(19)
            },
            unlocked() {return (hasUpgrade("d", 45))},
        },
        61: {
            title: "THE GREAT WORLD",
            description: "Dice cooldown is now 15 and x100 dice boost and automate dice and unlock rainbow dice ",
            cost: new Decimal(5e5),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.cb = new Decimal(15)
                player.d.db = new Decimal(100)
            },
            unlocked() {return (hasUpgrade("d", 55))},
            style: {
                "width": "650px",
                "height": "20px",
                "border-color": "red"
            }
        },
        71: {
            title: "Absoulte Speed I",
            description: "Dice Cooldown 19 -> 18",
            cost: new Decimal(1e8),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.cb = new Decimal(18)
            },
            unlocked() {return (hasUpgrade("d", 61))},
        },
        72: {
            title: "Absoulte Speed II",
            description: "Dice Cooldown 18 -> 17",
            cost: new Decimal(2e8),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.cb = new Decimal(17)
            },
            unlocked() {return (hasUpgrade("d", 71))},
        },
        73: {
            title: "Absoulte Speed III",
            description: "Dice Cooldown 17 -> 16",
            cost: new Decimal(4e8),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.cb = new Decimal(16)
            },
            unlocked() {return (hasUpgrade("d", 72))},
        },
        74: {
            title: "Absoulte Speed IV",
            description: "Dice Cooldown 16 -> 15",
            cost: new Decimal(6e8),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.cb = new Decimal(15)
            },
            unlocked() {return (hasUpgrade("d", 73))},
        },
        75: {
            title: "Absoulte Speed V",
            description: "Dice Cooldown 15 -> 14",
            cost: new Decimal(7e8),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.cb = new Decimal(14)
            },
            unlocked() {return (hasUpgrade("d", 74))},
        },
        81: {
            title: "Absoulte Speed VI",
            description: "Dice Cooldown 14 -> 13",
            cost: new Decimal(1e9),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.cb = new Decimal(13)
            },
            unlocked() {return (hasUpgrade("d", 75))},
        },
        82: {
            title: "15",
            description: "You can now roll a 15",
            cost: new Decimal(1.5e9),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.maxr = new Decimal(16)
            },
            unlocked() {return (hasUpgrade("d", 81))},
        },
        83: {
            title: "16",
            description: "You can now roll a 16",
            cost: new Decimal(2e9),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.maxr = new Decimal(17)
            },
            unlocked() {return (hasUpgrade("d", 82))},
        },
        84: {
            title: "17",
            description: "You can now roll a 17",
            cost: new Decimal(2.5e9),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.maxr = new Decimal(18)
            },
            unlocked() {return (hasUpgrade("d", 83))},
        },
        85: {
            title: "18",
            description: "You can now roll a 18",
            cost: new Decimal(4e9),
            currencyInternalName: "points",
            currencyDisplayName: "Cash",
            onPurchase() {
                player.d.maxr = new Decimal(19)
            },
            unlocked() {return (hasUpgrade("d", 84))},
        },
        301: {
            title: "Shiny Requirements",
            description: "The requirement for getting golden dice is now 24",
            cost: new Decimal(5),
            currencyInternalName: "golddice",
            currencyDisplayName: "Gold Dice",
            currencyLayer: "d",
            onPurchase() {
                player.d.req = new Decimal(24)
            },
            style: {
                "border-color": "gold"
            },
        },
        302: {
            title: "Shiny Boosts",
            description: "You now get +x0.55 boost each gold dice",
            cost: new Decimal(5),
            currencyInternalName: "golddice",
            currencyDisplayName: "Gold Dice",
            currencyLayer: "d",
            onPurchase() {
                player.d.ba = new Decimal(0.55)
            },
            unlocked() {return (hasUpgrade("d", 301))},
            style: {
                "border-color": "gold"
            },
        },
        303: {
            title: "Lazy Cashgrab",
            description: "Unlock the RNG tab",
            cost: new Decimal(10),
            currencyInternalName: "golddice",
            currencyDisplayName: "Gold Dice",
            currencyLayer: "d",
            
            unlocked() {return (hasUpgrade("d", 302))},
            style: {
                "border-color": "gold"
            },
        },
        304: {
            title: "RNG essence",
            description: "You can now generate RNG essence",
            cost: new Decimal(10),
            currencyInternalName: "golddice",
            currencyDisplayName: "Gold Dice",
            currencyLayer: "d",
            onPurchase() {
                player.d.cpre = new Decimal(1)
            },
            unlocked() {return (hasUpgrade("d", 303))},
            style: {
                "border-color": "gold"
            },
        },
        305: {
            title: "Multiple Goodies",
            description: "+x0.6 from each golden dice and the req is now 23",
            cost: new Decimal(12),
            currencyInternalName: "golddice",
            currencyDisplayName: "Gold Dice",
            currencyLayer: "d",
            onPurchase() {
                player.d.req = new Decimal(23)
                player.d.ba = new Decimal(0.6)
            },
            unlocked() {return (hasUpgrade("d", 304))},
            style: {
                "border-color": "gold"
            },
        },
        601: {
            title: "Awesome Gold",
            description: "+x0.75 from each golden dice and the req is now 22",
            cost: new Decimal(3),
            currencyInternalName: "rainbowdice",
            currencyDisplayName: "Rainbow Dice",
            currencyLayer: "d",
            onPurchase() {
                player.d.req = new Decimal(22)
                player.d.ba = new Decimal(0.75)
            },
            unlocked() {return (hasUpgrade("d", 304))},
            style: {"border-color": "red"}
           
                
        },
        602: {
            title: "The Best Gold",
            description: "+x0.8 from each golden dice and the req is now 20",
            cost: new Decimal(5),
            currencyInternalName: "rainbowdice",
            currencyDisplayName: "Rainbow Dice",
            currencyLayer: "d",
            onPurchase() {
                player.d.req = new Decimal(20)
                player.d.ba = new Decimal(0.8)
            },
            unlocked() {return (hasUpgrade("d", 601))},
            style: {"border-color": "orange"}
 
        },
        603: {
            title: "Rainbow Requirements",
            description: "The gold dice requirement is now 15 and the rainbow dice requirement is now 20",
            cost: new Decimal(5),
            currencyInternalName: "rainbowdice",
            currencyDisplayName: "Rainbow Dice",
            currencyLayer: "d",
            onPurchase() {
                player.d.req = new Decimal(15)
                player.d.reqr = new Decimal(20)
            },
            unlocked() {return (hasUpgrade("d", 602))},
            style: {"border-color": "yellow"}
        }
    },
    clickables: {
        11: {
            style: {
                "color": "black" , "font-size": "25px"
            },
            display() {return player.d.random},
            canClick() {if (player.d.cooldown.gte(player.d.cb)) return true},
            onClick() {
                player.d.random = Math.floor(Math.random() * player.d.maxr)
                player.points = player.points.add(player.d.random*player.d.db*player.r.slb*player.d.goldboost*player.d.rainbowboost*player.d.casho)
                player.d.cooldown = new Decimal(0)
                player.d.rolled = player.d.rolled.add(1)
                player.d.rolls = player.d.rolls.add(1)
            },
            unlocked() {return (!hasUpgrade("d", 42))},
        },
        12: {
            style: {
                "color": "green" , "font-size": "25px", "border-color": "green"
            },
            display() {return player.d.random},
            canClick() {if (player.d.cooldown.gte(player.d.cb)) return true},
            onClick() {
                player.d.random = Math.floor(Math.random() * player.d.maxr)
                player.points = player.points.add(player.d.random*player.d.db*player.r.slb*player.d.goldboost*player.d.rainbowboost*player.d.casho*1.25)
                player.d.cooldown = new Decimal(0)
                player.d.rolled = player.d.rolled.add(1)
                player.d.rolls = player.d.rolls.add(1)
            },
            unlocked() {return (hasUpgrade("d", 42) && !hasUpgrade("d",53))},
        },
        13: {
            
            style: {
                "color": "blue" , "font-size": "25px", "border-color": "blue"
            },
            display() {return player.d.random},
            canClick() {if (player.d.cooldown.gte(player.d.cb)) return true},
            onClick() {
                player.d.random = Math.floor(Math.random() * player.d.maxr)
                player.points = player.points.add(player.d.random*player.d.db*player.r.slb*player.d.goldboost*player.d.rainbowboost*player.d.casho*3)
                player.d.cooldown = new Decimal(0)
                player.d.rolled = player.d.rolled.add(1)
                player.d.rolls = player.d.rolls.add(1)
            },
            unlocked() {return (hasUpgrade("d", 53))},
        },
    }
}),
addLayer("r", {
    name: "rng", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RNG", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        chance: new Decimal(1),
        cooldown2: new Decimal(1),
        poss: new Decimal(1),
        slb: new Decimal(1),
        ess: new Decimal(0),
        eg: new Decimal(0.01),
        be: new Decimal(0),
        wa: new Decimal(30),
        rbb: new Decimal(1),
        power: new Decimal(10),
        ps: new Decimal(0),
        a: new Decimal(0),
        a2: new Decimal(0),
        pd1: new Decimal(1),
        bea: new Decimal(1),
        a3: new Decimal(0)
    }},
    color: "#02E3FF",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "", // Name of prestige currency
    baseResource: "cash", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("d",303)},
    update(diff) {
        if (hasUpgrade("r",35)) clickClickable("r",11)
        player.r.cooldown2 = player.r.cooldown2.add(1)
        if (player.r.cooldown2 == player.r.wa) player.r.cooldown2 = new Decimal(player.r.wa)
        if (hasUpgrade("d",304) && player.d.cpre.gte(1)) player.r.ess = player.r.ess.add(player.r.eg)
        if (hasUpgrade("r",33)) player.r.rbb = player.d.rainbowdice
        player.r.power = player.r.power.add(player.r.ps)
        if (player.r.a == 1) buyBuyable2(this.layer, 11)
        if (player.r.a2 == 1) buyBuyable2(this.layer, 21)
        if (player.r.a3 == 1) buyBuyable2(this.layer, 31)
        },
    tabFormat: {
        "RNG": {
            content: [
                ["display-text",
                    function() {return '1 in ' + format(player.r.chance)},
                    {"color": "cyan" , "font-size": "30px"}],
                ["display-text",
                        function() {return 'Boost:  x' + format(player.r.slb)},
                        {"color": "cyan" , "font-size": "30px"}],
                    "blank",
                    ["row",[["clickable",11]]]
            ],
            buttonStyle: {"border-color": "cyan"},
        },
        "ESSENCE": {
            content: [
                ["display-text",
                    function() {return 'You have: ' + format(player.r.ess) + ' RNG Essence'},
                    {"color": "blue" , "font-size": "22px"}],
                    "blank",
                    ["row",[["upgrade",11],["upgrade",12],["upgrade",13],["upgrade",14],["upgrade",15]]],
                    ["row",[["upgrade",21],["upgrade",22],["upgrade",23],["upgrade",24],["upgrade",25]]],
                    ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34],["upgrade",35]]],
                    ["row",[["upgrade",41]]],
                    ["row",[["upgrade",51],["upgrade",52],["upgrade",53],["upgrade",54],["upgrade",55]]],

            ],
            buttonStyle: {"border-color": "blue"},
            unlocked() {return (hasUpgrade("d", 304))},
        },
        "DIMENSIONS": {
            content: [
                ["display-text",
                    function() {return 'You have: ' + format(player.r.power) + ' Power'},
                    {"color": "red" , "font-size": "30px"}],
                    "blank",
                    ["row",[["buyable",11]]],
                    ["row",[["buyable",21]]],
                    ["row",[["buyable",31]]],
                    ["row",[["buyable",41]]],
                    "blank",
                    ["row",[["upgrade",61],["upgrade",62],["upgrade",63],["upgrade",64],["upgrade",65]]],
            ],
            buttonStyle: {"border-color": "red"},
            unlocked() {return (hasUpgrade("r", 54))},
        }
    },
    buyables: {
        11: {
			title: "Dimension I",
			cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
                return new Decimal(10).mul(x).pow(1.2)
            },
			display() { // Everything else displayed in the buyable button after the title
                return "Generate power Cost: " + format(tmp.r.buyables[11].cost) + " Power Amount: " + formatWhole(getBuyableAmount("r",11)) + "Effect:" + format(player.r.ps) + " power/s"
            }, 
            canAfford() {
                    return player.r.power.gte(tmp.r.buyables[11].cost)},
            buy() { 
                if (player.r.a == 1) {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1*getBuyableAmount(this.layer, 21)*player.r.bea))
                player.r.ps = player.r.ps.add(0.1*getBuyableAmount(this.layer, 11)*getBuyableAmount(this.layer, 21)*getBuyableAmount(this.layer,31)*player.r.pd1*player.r.bea)
                } else {
                    player[this.layer].power = player[this.layer].power.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.r.ps = player.r.ps.add(0.1)
                }
            },
            style: {
                "width": "600px",
                "height": "50px"
            }
        },
        21: {
			title: "Dimension II",
			cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
                return new Decimal(10).mul(x).pow(3)
            },
			display() { // Everything else displayed in the buyable button after the title
                return "Generate power Cost: " + format(tmp.r.buyables[21].cost) + " Power Amount: " + formatWhole(getBuyableAmount("r",21))
            }, 
            canAfford() {
                    return player.r.power.gte(tmp.r.buyables[21].cost)},
            buy() { 
                if (player.r.a2 == 1) {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1*getBuyableAmount(this.layer, 31)))
                }  else {
                player[this.layer].power = player[this.layer].power.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.r.a = new Decimal(1)
                }
                
            },
            style: {
                "width": "600px",
                "height": "50px"
            }
        },
        31: {
			title: "Dimension III",
			cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let y = 1e5
                return new Decimal(y).mul(x).pow(x)
            },
			display() { // Everything else displayed in the buyable button after the title
                return "Generate power Cost: " + format(tmp.r.buyables[31].cost) + " Power Amount: " + formatWhole(getBuyableAmount("r",31))
            }, 
            canAfford() {
                    return player.r.power.gte(tmp.r.buyables[31].cost)},
                    unlocked() {return player.r.a == 1},
            buy() {
                if (player.r.a3 == 1) {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1*getBuyableAmount(this.layer, 41)))
                } else {
                player[this.layer].power = player[this.layer].power.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.r.a2 = new Decimal(1)
                }
                
                
            },
            style: {
                "width": "600px",
                "height": "50px"
            }
        },
        41: {
			title: "Dimension IV",
			cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let y = 1e15
                return new Decimal(y).mul(x).pow(x)
            },
			display() { // Everything else displayed in the buyable button after the title
                return "Generate power Cost: " + format(tmp.r.buyables[41].cost) + " Power Amount: " + formatWhole(getBuyableAmount("r",41))
            }, 
            canAfford() {
                    return player.r.power.gte(tmp.r.buyables[41].cost)},
                    unlocked() {return getBuyableAmount(this.layer, 31).gte(5)},
            buy() {
               
                player[this.layer].power = player[this.layer].power.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.r.a3 = new Decimal(1)
                
                
            },
            style: {
                "width": "600px",
                "height": "50px"
            }
        },
    },
    upgrades: {
        11: {
            title: "Better Production",
            description: "You gain 0.03 rng essence/s now",
            cost: new Decimal(25),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.eg = new Decimal(0.03)
            },
            unlocked() {return (hasUpgrade("d", 304))},
            style: {
                "border-color": "blue"
            },
        },
        12: {
            title: "SUPER Production",
            description: "You gain 0.3 rng essence/s now",
            cost: new Decimal(30),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.eg = new Decimal(0.3)
            },
            unlocked() {return (hasUpgrade("r", 11))},
            style: {
                "border-color": "blue"
            },
        },
        13: {
            title: "SUPER Production",
            description: "You gain 1 rng essence/s now",
            cost: new Decimal(50),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.eg = new Decimal(1)
            },
            unlocked() {return (hasUpgrade("r", 12))},
            style: {
                "border-color": "blue"
            },
        },
        14: {
            title: "Better RNG",
            description: "Your rng is better",
            cost: new Decimal(75),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.be = new Decimal(1)
            },
            unlocked() {return (hasUpgrade("r", 13))},
            style: {
                "border-color": "blue"
            },
        },
        15: {
            title: "RNG master",
            description: "Your rng is much better",
            cost: new Decimal(5000),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.be = new Decimal(5)
            },
            unlocked() {return (hasUpgrade("r", 14))},
            style: {
                "border-color": "blue"
            },
        },
        21: {
            title: "RNG LEGEND",
            description: "Your rng is so much better",
            cost: new Decimal(7500),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.be = new Decimal(10)
            },
            unlocked() {return (hasUpgrade("r", 15))},
            style: {
                "border-color": "blue"
            },
        },
        22: {
            title: "RNG CHAMPION",
            description: "Your rng is so much more better",
            cost: new Decimal(1.5e4),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.be = new Decimal(25)
            },
            unlocked() {return (hasUpgrade("r", 21))},
            style: {
                "border-color": "blue"
            },
        },
        23: {
            title: "RNG Cooldown I",
            description: "The cooldown is decreased from 30 -> 29",
            cost: new Decimal(2e4),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.wa = new Decimal(29)
            },
            unlocked() {return (hasUpgrade("r", 22))},
            style: {
                "border-color": "blue"
            },
        },
        24: {
            title: "RNG Cooldown II",
            description: "The cooldown is decreased from 29 -> 28 and you gain 5 essence /s",
            cost: new Decimal(2.25e4),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.wa = new Decimal(28)
                player.r.eg = new Decimal(5)
            },
            unlocked() {return (hasUpgrade("r", 23))},
            style: {
                "border-color": "blue"
            },
        },
        25: {
            title: "RNG Cooldown III",
            description: "The cooldown is decreased from 28 -> 27 and you gain 10 essence/s",
            cost: new Decimal(3e4),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.wa = new Decimal(27)
                player.r.eg = new Decimal(10)
            },
            unlocked() {return (hasUpgrade("r", 24))},
            style: {
                "border-color": "blue"
            },
        },
        31: {
            title: "RNG Cooldown IV",
            description: "The cooldown is decreased from 27 -> 26 and you gain 25 essence/s",
            cost: new Decimal(4e4),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.wa = new Decimal(26)
                player.r.eg = new Decimal(25)
                
            },
            unlocked() {return (hasUpgrade("r", 25))},
            style: {
                "border-color": "blue"
            },
        },
        32: {
            title: "RNG Cooldown V",
            description: "The cooldown is decreased from 26 -> 25 and you gain 50 essence/s",
            cost: new Decimal(4.5e4),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.wa = new Decimal(25)
                player.r.eg = new Decimal(50)
            },
            unlocked() {return (hasUpgrade("r", 31))},
            style: {
                "border-color": "blue"
            },
        },
        33: {
            title: "Rarest Rolls",
            description: "Rng is better based on how many rainbow dices you have",
            cost: new Decimal(4.5e4),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
    
                
            },
            unlocked() {return (hasUpgrade("r", 32))},
            style: {
                "border-color": "blue"
            },
        },
        34: {
            title: "ULTRA ROLLS",
            description: "Ultimate rng",
            cost: new Decimal(7e4),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.be = new Decimal(35)
                
            },
            unlocked() {return (hasUpgrade("r", 33))},
            style: {
                "border-color": "blue"
            },
        },
        35: {
            title: "Forever RNG",
            description: "Auto roll rng and better rng",
            cost: new Decimal(3e5),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.be = new Decimal(45)
                
            },
            unlocked() {return (hasUpgrade("r", 34))},
            style: {
                "border-color": "blue"
            },
        },
        41: {
            title: "AT THE SPEED OF LIGHT",
            description: "No cooldown to rolling and get some better rng",
            cost: new Decimal(6e5),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.be = new Decimal(100)
                player.r.wa = new Decimal(0)
                
            },
            unlocked() {return (hasUpgrade("r", 35))},
            style: {
                "border-color": "cyan",
                "width": "500px"
            },
        },
        51: {
            title: "MAXIMUM RNG",
            description: "Is this the best?",
            cost: new Decimal(1e5),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.be = new Decimal(60)
            },
            unlocked() {return (hasUpgrade("r", 41))},
            style: {
                "border-color": "blue"
            },
        },
        52: {
            title: "RNG GALAXY",
            description: "The rng is getting better",
            cost: new Decimal(1e5),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.be = new Decimal(199)
            },
            unlocked() {return (hasUpgrade("r", 51))},
            style: {
                "border-color": "blue"
            },
        },
        53: {
            title: "RNG UNIVERSE",
            description: "The rng is now at the max",
            cost: new Decimal(1e5),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.be = new Decimal(650)
            },
            unlocked() {return (hasUpgrade("r", 52))},
            style: {
                "border-color": "blue"
            },
        },
        54: {
            title: "RNG DIMENSIONS",
            description: "Refrence?",
            cost: new Decimal(5e5),
            currencyInternalName: "ess",
            currencyDisplayName: "RNG ESSENCE",
            currencyLayer: "r",
            onPurchase() {
                player.r.be = new Decimal(650)
            },
            unlocked() {return (hasUpgrade("r", 53))},
            style: {
                "border-color": "red",
                "width": "250px"
            },
        },
        61: {
            title: "Pocket Dimension",
            description: "You get more power/s from the first dimension",
            cost: new Decimal(1e9),
            currencyInternalName: "power",
            currencyDisplayName: "Power",
            currencyLayer: "r",
            onPurchase() {
                player.r.pd1 = new Decimal(1e4)
            },
            unlocked() {return (hasUpgrade("r", 54))},
            style: {
                "border-color": "red",
            },
        },
        62: {
            title: "Dimension Booster",
            description: "You get even more power/s from the first dimension",
            cost: new Decimal(5e12),
            currencyInternalName: "power",
            currencyDisplayName: "Power",
            currencyLayer: "r",
            onPurchase() {
                player.r.pd1 = new Decimal(1e6)
            },
            unlocked() {return (hasUpgrade("r", 61))},
            style: {
                "border-color": "red",
            },
        },
        63: {
            title: "Boosted Dimension Boosters",
            description: "MORE POWER",
            cost: new Decimal(3e15),
            currencyInternalName: "power",
            currencyDisplayName: "Power",
            currencyLayer: "r",
            onPurchase() {
                player.r.pd1 = new Decimal(1e9)
            },
            unlocked() {return (hasUpgrade("r", 62))},
            style: {
                "border-color": "red",
            },
        },
        64: {
            title: "The Second First Dimension",
            description: "Gain more first dimensions",
            cost: new Decimal(1e19),
            currencyInternalName: "power",
            currencyDisplayName: "Power",
            currencyLayer: "r",
            onPurchase() {
                player.r.pd1 = new Decimal(1e12)
                player.r.bea = new Decimal(10)
            },
            unlocked() {return (hasUpgrade("r", 63))},
            style: {
                "border-color": "red",
            },
        },
        65: {
            title: "Dimensional Rolling",
            description: "Every OoM of power boosts cash",
            cost: new Decimal(3e40),
            currencyInternalName: "power",
            currencyDisplayName: "Power",
            currencyLayer: "r",
            onPurchase() {
                player.r.pd1 = new Decimal(1e15)
                player.r.bea = new Decimal(25)
            },
            unlocked() {return (hasUpgrade("r", 64))},
            style: {
                "border-color": "red",
            },
        },
    },
    clickables: {
        11: {
        style: {
            "color": "cyan" , "font-size": "15px"
        },
        display() {return ' 1 in ' + format(player.r.chance)},
        canClick() {if (player.r.cooldown2.gte(player.r.wa)) return true},
        onClick() {
            player.r.poss = Math.floor(Math.random() * 2-player.r.be-player.r.rbb)
            if (player.r.poss == 1) {
                player.r.chance = new Decimal(1)
            } else {
                player.r.poss = Math.floor(Math.random() * 5-player.r.be-player.r.rbb)
                if (player.r.poss == 1) {
                    player.r.chance = new Decimal(5)
                    player.r.slb = player.r.slb.add(0.0000000000001)
                } else {
                    player.r.poss = Math.floor(Math.random() * 16-player.r.be-player.r.rbb)
                    if (player.r.poss == 1) {
                        player.r.chance = new Decimal(15)
                        player.r.slb = player.r.slb.add(0.000000000001)
                    } else {
                        player.r.poss = Math.floor(Math.random() * 51-player.r.be-player.r.rbb)
                        if (player.r.poss == 1) {
                            player.r.chance = new Decimal(50)
                            player.r.slb = player.r.slb.add(0.00000000001)
                        } else {
                            player.r.poss = Math.floor(Math.random() * 151-player.r.be-player.r.rbb)
                            if (player.r.poss == 1) {
                                player.r.chance = new Decimal(150)
                                player.r.slb = player.r.slb.add(0.0000000001)
                            } else {
                                player.r.poss = Math.floor(Math.random() * 301-player.r.be-player.r.rbb)
                                if (player.r.poss == 1) {
                                    player.r.chance = new Decimal(300)
                                    player.r.slb = player.r.slb.add(0.000000001)
                                } else {
                                    player.r.poss = Math.floor(Math.random() * 751-player.r.be-player.r.rbb)
                                    if (player.r.poss == 1) {
                                        player.r.chance = new Decimal(750)
                                    player.r.slb = player.r.slb.add(0.00000001)
                                    } else {
                                        player.r.poss = Math.floor(Math.random() * 1501-player.r.be-player.r.rbb)
                                        if (player.r.poss == 1) {
                                            player.r.chance = new Decimal(1500)
                                            player.r.slb = player.r.slb.add(0.0000001)
                                        } else {
                                            player.r.poss = Math.floor(Math.random() * 3333-player.r.be-player.r.rbb)
                                            if (player.r.poss == 1) {
                                                player.r.chance = new Decimal(3333)
                                            player.r.slb = player.r.slb.add(0.000001)
                                            } else {
                                                player.r.poss = Math.floor(Math.random() * 5750-player.r.be-player.r.rbb)
                                                if (player.r.poss == 1) {
                                                    player.r.chance = new Decimal(5750)
                                                    player.r.slb = player.r.slb.add(0.00001)
                                                } else {
                                                    player.r.poss = Math.floor(Math.random() * 10000-player.r.be-player.r.rbb)
                                                    if (player.r.poss == 1) {
                                                        player.r.chance = new Decimal(10000)
                                                        player.r.slb = player.r.slb.add(0.0001)
                                                    } else {
                                                        player.r.poss = Math.floor(Math.random() * 25000-player.r.be-player.r.rbb)
                                                        if (player.r.poss == 1) {
                                                            player.r.chance = new Decimal(25000)
                                                            player.r.slb = player.r.slb.add(0.001)
                                                        } else {
                                                            player.r.poss = Math.floor(Math.random() * 44444-player.r.be-player.r.rbb)
                                                            if (player.r.poss == 1) {
                                                                player.r.chance = new Decimal(44444)
                                                                player.r.slb = player.r.slb.add(0.01)
                                                            } else {
                                                                player.r.poss = Math.floor(Math.random() * 1e4-player.r.be-player.r.rbb)
                                                                if (player.r.poss == 1) {
                                                                    player.r.chance = new Decimal(1e4)
                                                                    player.r.slb = player.r.slb.add(0.1)
                                                                } else {
                                                                    player.r.poss = Math.floor(Math.random() * 2.5e5-player.r.be-player.r.rbb)
                                                                    if (player.r.poss == 1) {
                                                                        player.r.chance = new Decimal(2.5e5)
                                                                        player.r.slb = player.r.slb.add(1)
                                                                    } else {
                                                                        player.r.poss = Math.floor(Math.random() * 9.9e6-player.r.be-player.r.rbb)
                                                                        if (player.r.poss == 1) {
                                                                            player.r.chance = new Decimal(9.9e6)
                                                                        player.r.slb = player.r.slb.add(10)
                                                                        }
                                                                    }
                                                                }
                                                            
                                                                
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                
                    
                }
            }
            player.r.cooldown2 = new Decimal(0)
        },
        },
    }
}),
addLayer("a", {
    name: "achievement", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🏆 ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#F9E800",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "ap", // Name of prestige currency
    baseResource: "cash", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
     update(diff) {
        player.a.points = new Decimal(player.a.achievements.length)
        },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat: {
        "achievements": {
             content: [
                ["display-text",
                    function() {return 'You have ' + format(player.a.points) + ' Achievements Points'},
                    {"color": "gold" , "font-size": "30px"}],
                    "blank",
                    ["row",[["achievement",11],["achievement",12],["achievement",13],["achievement",14],["achievement",15],["achievement",16]]],
                    ["row",[["achievement",21],["achievement",22],["achievement",23],["achievement",24],["achievement",25],["achievement",26]]]
            ],
            buttonStyle: {"border-color": "gold"},
        },
        "secret": {
            content: [
                  ["row",[["achievement",301],["achievement",302],["achievement",303],["achievement",304],["achievement",305],["achievement",306]]],
            ]
        }
    },
    achievements: {
        11: {
            name: "Rolling",
            tooltip: "Just keep rolling just keep rolling",
            doneTooltip: "Get 50 cash",
            done(){return player.points.gte(50)},
            style: {
                "border-color": "gold"
            }
        },
        12: {
            name: "7??",
            tooltip: "You can roll a seven now? That's not normal",
            doneTooltip: "Be able to roll a 7",
            done(){return player.d.maxr.gte(8)},
            style: {
                "border-color": "gold"
            }
        },
        13: {
            name: "Shiny",
            tooltip: "ooooh",
            doneTooltip: "Get 5 gold dice",
            done(){return player.d.golddice.gte(5)},
            style: {
                "border-color": "gold"
            }
        },
        14: {
            name: "RNG",
            tooltip: "bruh",
            doneTooltip: "Unlock rng",
            done(){return hasUpgrade("d",303)},
            style: {
                "border-color": "gold"
            }
        },
        15: {
            name: "Core RNG",
            tooltip: "The essence of rng now you can get better odds",
            doneTooltip: "Get 100 rng essence",
            done(){return player.r.ess.gte(100)},
            style: {
                "border-color": "gold"
            }
        },
        16: {
            name: "Somewhere over the rainbow",
            tooltip: "Wonder whats over there.",
            doneTooltip: "Get your first rainbow dice",
            done(){return player.d.rainbowdice.gte(1)},
            style: {
                "border-color": "gold"
            }
        },
        21: {
            name: "RNG MASTER",
            tooltip: "HOW???",
            doneTooltip: "Get a roll better than 2500",
            done(){return player.r.chance.gte(2500)},
            style: {
                "border-color": "gold"
            }
        },
        22: {
            name: "Is this a reference?",
            tooltip: "maybe",
            doneTooltip: "Have 1e5 power",
            done(){return player.r.power.gte(1e5)},
            style: {
                "border-color": "gold"
            }
        },
        301: {
            name: "You'll literally never get this",
            tooltip: "lol",
            doneTooltip: "yeah never",
            done(){return player.d.rainbowdice.gte(1e100)},
            style: {
                "border-color": "red"
            }
        }
    }
})
