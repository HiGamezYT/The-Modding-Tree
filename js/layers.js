



addLayer("ba", {
    name: "base", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BASE", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        rocks: new Decimal(0),
        sand: new Decimal(0),
        bact: new Decimal(0),
        half1: new Decimal(1),
        as: new Decimal(0)
    }},
    color: "#414241",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Pure Power", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade(this.layer, 61)) mult = mult.times(upgradeEffect(this.layer, 61))
        if (hasUpgrade(this.layer, 62)) mult = mult.times(upgradeEffect(this.layer, 62))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for Pure Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
   
    doReset(resettingLayer){ // Triggers when this layer is being reset, along with the layer doing the resetting. Not triggered by lower layers resetting, but is by layers on the same row.
        if(layers[resettingLayer].row > this.row) return;
        layerDataReset(this.layer.points);
        let keep = [];
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
},

passiveGeneration(){return hasUpgrade("ba",51)},
update() {

   
     if (hasUpgrade("ba",44))  player.ba.rocks = player.ba.rocks.add(0.01)
     if (hasUpgrade("ba",52))  player.ba.rocks = player.ba.rocks.add(player.ba.bact.div(3))
     if (hasUpgrade("ba",53)) player.ba.sand = player.ba.sand.add(0.01)
     if (hasUpgrade("ba",45) && player.ba.as.gte(1)) player.ba.sand = player.ba.sand.add(player.ba.bact.div(3.5))
},

    tabFormat: {
        "Base": {
            content: [
                ["infobox", "mars"],
                "main-display",
                "prestige-button",
                "blank",
                ["row",[["upgrade",11],["upgrade",12],["upgrade",13]]],
                ["row",[["upgrade",21],["upgrade",22],["upgrade",23]]],
                ["row",[["upgrade",61],["upgrade",62],["upgrade",63]]]
            ],
            
        },
        "Exploration": {
            unlocked() {return (hasUpgrade("ba", 23))},
            content: [
                ["infobox", "marsexplore"],
                ["display-text",
                function() {return 'You have ' + format(player.ba.rocks) + ' Mars Rocks'},
                {"color": "red" , "font-size": "20px"}],
                ["display-text",
                function() {return 'You have ' + format(player.ba.sand) + ' Mars Sand'},
                {"color": "beige" , "font-size": "20px"}],
                ["display-text",
                function() {return 'You have ' + format(player.ba.bact) + ' Bacteria Samples'},
                {"color": "green" , "font-size": "20px"}],
                "blank",
                "buyables"
            ],
            
        },
        "Mars Materials": {
            unlocked() {return (hasUpgrade("ba", 23))},
            content: [
                ["infobox", "marsma"],
                ["display-text",
                function() {return 'You have ' + format(player.ba.rocks) + ' Mars Rocks'},
                {"color": "red" , "font-size": "20px"}],
                ["display-text",
                function() {return 'You have ' + format(player.ba.sand) + ' Mars Sand'},
                {"color": "beige" , "font-size": "20px"}],
                ["display-text",
                function() {return 'You have ' + format(player.ba.bact) + ' Bacteria Samples'},
                {"color": "green" , "font-size": "20px"}],
                "blank",
                ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34],["upgrade",35]]],
                ["row",[["upgrade",41],["upgrade",42],["upgrade",43],["upgrade",44],["upgrade",45]]],
                ["row",[["upgrade",51],["upgrade",52],["upgrade",53],["upgrade",54],["upgrade",55]]]
            ],
            
        }
    },
    infoboxes: {
        mars: {
            title: "DOCUMENT MARS",
            titleStyle: {'color': '#000000'},
            body() { return "Welcome to mars! If you are reading this you were accepted into the mars programm. Your goal is to harvest energy from mars and to research about this planet. You even may harvest the energy of other planets!" },
            bodyStyle: {'background-color': "#4A2121"}
            
        },
        marsexplore: {
            title: "DOCUMENT EX0001",
            titleStyle: {'color': '#000000'},
            body() { return "You have succsessfully harvested enough energy and you are now ready the explore mars! You will start off by collecting rocks" },
            bodyStyle: {'background-color': "#4A2121"}
            
        },
        marsma: {
            title: "DOCUMENT EX0002",
            titleStyle: {'color': '#000000'},
            body() { return "You've collected your first mars rock! Now it is time to collect more. Soon your oxygen will run out so it will be time to grow plants." },
            bodyStyle: {'background-color': "#4A2121"}
            
        },
        
    },
    buyables: {
        showRespec: true,
        respec() { // Optional, reset things and give back your currency. Having this function makes a respec button appear
           
            resetBuyables(this.layer)
            player.ba.rocks = new Decimal(0)
            player.ba.sand = new Decimal(0)
            player.ba.bact = new Decimal(0) // Force a reset
           
        },
        respecText: "RESPEC/SEARCH AGAIN", // Text on Respec button, optional
        respecMessage: "This will reset all mars materials!",
       
        11: {
            title: "Mars Rocks", // Optional, displayed at the top in a larger font
            cost(x) { return new Decimal(35).mul(x).mul(1.25).div(player.ba.half1) },
            display() { // Everything else displayed in the buyable button after the title
                return " You explore and only find mars rocks the most common thing in the vast expanse of mars\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            respecText: "RESPEC/SEARCH AGAIN", // Text on Respec button, optional
            respecMessage: "You will lose all mars material if you do this.",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.rocks = player.ba.rocks.add(1)
            }
        
           
        },
        12: {
            title: "Mars Sand", // Optional, displayed at the top in a larger font
            cost(x) { return new Decimal(100).mul(x).mul(1.3)},
            display() { // Everything else displayed in the buyable button after the title
                return " Sand is everywhere, but can still be used in important ways\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.sand = player.ba.sand.add(1)
            },
            unlocked() { return  (hasUpgrade("ba",33))} 
        },
        13: {
            title: "Bacteria Samples", // Optional, displayed at the top in a larger font
            cost(x) { return new Decimal(200).mul(x).mul(1.35)},
            display() { // Everything else displayed in the buyable button after the title
                return " If you take samples from a rock there is a chance that on the petri dish bacteria will start to form even though this is rarer than getting rocks\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.bact = player.ba.bact.add(1)
            },
            unlocked() { return  (hasUpgrade("ba",43))}
        },
    },
    upgrades: {
        11: {
            title: "Fresh start",
            description: "Begin to harvest energy from mars.",
            cost: new Decimal(0),
        },
        12: {
            title: "Robotic Inspection",
            description: "Inspecting the robots.... And... Ok they seem to be in perfect condition. (x2 energy gain)",
            cost: new Decimal(5),
        },
        13: {
            title: "Latest Bolts",
            description: "Man... I didn't know amazon sold these futurisitc bolts. (x2 energy gain)",
            cost: new Decimal(10),
        },
        21: {
            title: "New Wrench",
            description: "I need a new wrench (x3 energy gain)",
            cost: new Decimal(10),
            unlocked() { return (hasUpgrade(this.layer, 13))}, 
        },
        22: {
            title: "POWER",
            description: "The pure power is getting STRONGER! (Pure power boosts energy gain)",
            cost: new Decimal(20),
            unlocked() { return (hasUpgrade(this.layer, 13))}, 
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        
        },
        23: {
            title: "Expedition",
            description: "It's time to explore mars.",
            cost: new Decimal(50),
            unlocked() { return (hasUpgrade(this.layer, 13))}, 
        },
        31: {
            title: "Rover Update",
            description: "The rover doesnt understand the difference between rocks and dust... (The cost for the mars rocks buyable is cheaper)",
            cost: new Decimal(2),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            effectDisplay() { return format(player.ba.half1) + "/" },
            unlocked() { return (hasUpgrade("ba",23))}, 
            onPurchase() {
                player.ba.half1 = player.ba.half1.add(1)
            }
        },
        32: {
            title: "Useful rocks",
            description: "The mars rocks can be harvested for energy! (Mars rocks boosts energy)",
            cost: new Decimal(3),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",31))}, 
            effect() {
                return player.ba.rocks.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

        },
        33: {
            title: "New capabilities",
            description: "The rovers are now able to pick up Mars sand",
            cost: new Decimal(5),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",32))}
        },
        34: {
            title: "Extensive Research",
            description: "These mars rocks could be used to harvest so much energy... If only there were a way... (x3 energy gain)",
            cost: new Decimal(7),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",33))}
        },
        35: {
            title: "Potential",
            description: "There has to be a way to refine these rocks into ores.. Or what if there are ores on mars! I have to start worrying about oxygen soon... (x3 energy gain again)",
            cost: new Decimal(10),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",34))}
        },
        41: {
            title: "Sand filter",
            description: "Now that we have higher quality sand I can turn it into energy (Sand boosts energy)",
            cost: new Decimal(3),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",33))},
            effect() {
                return player.ba.sand.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        42: {
            title: "Sand Research",
            description: "You found out that there are mars sand grains in mars rocks after researching so now you can purify the mars rocks. (Mars rocks are cheaper)",
            cost: new Decimal(4),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",34))},
            onPurchase() {
                player.ba.half1 = player.ba.half1.add(1)
            }
           
        },
        43: {
            title: "Bacteria samples",
            description: "Its time to find bacteria samples! (unlock bacteria samples)",
            cost: new Decimal(5),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",34))}
        },
        44: {
            title: "Rock Drones",
            description: "Drones are now collecting rocks for you easir",
            cost: new Decimal(20),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",34))}
        },
        45: {
            title: "High quality sand",
            description: "Sand is now higher quality after some research (Sand boosts energy even better)",
            cost: new Decimal(35),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))},
            effect() {
                return player.ba.sand.add(1).pow(0.55)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        51: {
            title: "Pure Harvesting",
            description: "Pure power is now easier to harvest with new technology. (100% automatic gain for Pure Power)",
            cost: new Decimal(2),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))}
        },
        52: {
            title: "Bacteria Rocks",
            description: "Bacteria seems to enhance the rocks giving it more energy (Bacteria boosts mars rocks gain)",
            cost: new Decimal(8),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))}
        },
        53: {
            title: "Sand Drones",
            description: "Drones will now carry sand as well (gain 0.01 sand automatically)",
            cost: new Decimal(15),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))}
        },
        54: {
            title: "New POWER",
            description: "There is more ENERGY THE POWER INCREASES!",
            cost: new Decimal(17),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))}
        },
        55: {
            title: "Bacteria Infected Sand",
            description: "Bacteria seems to enhance the sand aswell giving it more energy (Bacteria boosts mars sand gain)",
            cost: new Decimal(600),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))},
            onPurchase() {
                player.ba.as = player.ba.as.add(1)
            }
        },
        61: {
            title: "ROCK POTENTIAL ULTRA",
            description: "The rocks are so strong. Who knew that they would make enough energy to keep the lights on to a city for a week! (Mars rocks boost Pure power)",
            cost: new Decimal(30000),
            unlocked() { return (hasUpgrade("ba",54))},
            effect() {
                return player.ba.rocks.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        62: {
            title: "SAND POTENTIAL ULTRA",
            description: "The sand is so bright and strong. THIS IS POWER! (Mars sand boost Pure power)",
            cost: new Decimal(1e6),
            unlocked() { return (hasUpgrade("ba",54))},
            effect() {
                return player.ba.sand.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        63: {
            title: "CRITICAL WARNING!",
            description: "OXYGEN RUNNING DANGEROUSLY LOW PLEASE START GROWING PLANTS FROM THE STARTER PACK (Unlock the Oxygen layer)",
            cost: new Decimal(3e11),
            unlocked() { return (hasUpgrade("ba",62))},
        }
        
    }

}),
addLayer("o", {
    name: "oxygen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OXY", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        ot: new Decimal(100)
    }},
    color: "#1A7C9E",
    requires: new Decimal(5e11), // Can be a function that takes requirement increases into account
    resource: "Oxygen Tanks", // Name of prestige currency
    baseResource: "Pure Power", // Name of resource prestige is based on
    baseAmount() {return player.ba.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.8, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "O: Reset for Oxygen", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        if (hasUpgrade("ba",63)) return true
    },
    branches: ['ba'],
    resetsNothing() {return true},
    bars: {
    oxygentank: {
        fillStyle: {'background-color' : "#2D6BB1"},
        baseStyle: {'background-color' : "#000756"},
        textStyle: {'text-shadow': '0px 0px 2px #000000'},

        borderStyle() {return {'border-width': "4px"}},
        direction: DOWN,
        width: 60,
        height: 250,
        progress() {
            return 100
        },
        display() {
            return formatWhole((player.o.ot))
        },
        unlocked: true,

    },
},
    tabFormat: {
        "OXYGEN": {
            content: [
                ["infobox", "oxygeninfo"],
                "main-display",
                "prestige-button",
                "blank",
                ["bar", "oxygentank"], "blank"
            ],
            
        },
    },
    infoboxes: {
        oxygeninfo: {
            title: "DOCUMENT 000000O1",
            titleStyle: {'color': '#2D6BB1'},
            body() { return "Your starting to run out of oxygen but there is no need to worry. When your oxygen runs out everything your doing comes to a halt but you can refresh your oxygen tanks very easily but that will be a tedious task so its time to grow plants!" },
            bodyStyle: {'background-color': "#000756"}
            
            
        }
        
    },

}),
addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🏆", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0)
    }},
    color: "#E9FF00",
    resource: "AP", // Name of prestige currency    exponent: 0.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    update() {player.a.points = new Decimal(player.a.achievements.length)},

    layerShown(){return true},
    tabFormat: {
        "Main": {
            content: [
                ["infobox", "mars"],
                "blank",
                ["display-text",
                        function() {return 'You have ' + format(player.a.points) + ' Achievement Points'},
                        {"color": "yellow" , "font-size": "23px"}],
                "blank",
                "achievements",
                
            ],
            
        }
    },
    achievements: {
        11: {
            name: "Fresh Start",
            tooltip: "Get 1 point",
            done(){return player.points.gte(1)}
        },
        12: {
            name: "Energy Harvester",
            tooltip: "Get 10 pure power",
            done(){return player.ba.points.gte(10)}
        },
        13: {
            name: "Red Rocks",
            tooltip: "Get 1 Mars rock",
            done(){return player.ba.rocks.gte(1)}
        },
        14: {
            name: "Powerful!",
            tooltip: "Get 350 pure power",
            done(){return player.ba.points.gte(350)}
        },
        15: {
            name: "Sand. BUT MARS!",
            tooltip: "Get 1 Mars Sand",
            done(){return player.ba.sand.gte(1)}
        },
        16: {
            name: "Infected",
            tooltip: "Get 2 Bacteria samples",
            done(){return player.ba.bact.gte(2)}
        },
        17: {
            name: "Lots of rocks",
            tooltip: "Get 20 Mars Rocks",
            done(){return player.ba.rocks.gte(20)}
        },
        21: {
            name: "EVEN MORE???",
            tooltip: "Get 100 Mars Rocks",
            done(){return player.ba.rocks.gte(100)}
        },
        22: {
            name: "There's sand.. EVERYWHERE",
            tooltip: "Get 25 Mars Sand",
            done(){return player.ba.sand.gte(25)}
        },
        23: {
            name: "MORE BACTERIA",
            tooltip: "Get 15 Bacteria Samples",
            done(){return player.ba.bact.gte(15)}
        },
        24: {
            name: "Rock mania",
            tooltip: "Get 1e6 Mars Rocks",
            done(){return player.ba.rocks.gte(1e6)} 
        },
        25: {
            name: "Sand mania",
            tooltip: "Get 1e6 Mars sand",
            done(){return player.ba.sand.gte(1e6)} 
        },
        26: {
            name: "Viral infection",
            tooltip: "Get 2000 Bacteria samples",
            done(){return player.ba.bact.gte(2000)} 
        }
    }
})
