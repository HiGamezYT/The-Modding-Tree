addLayer("ba", {
    name: "base", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BASE", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        rocks: new Decimal(0),
        half1: new Decimal(1)
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

    
    tabFormat: {
        "Base": {
            content: [
                ["infobox", "mars"],
                "main-display",
                "prestige-button",
                "blank",
                ["row",[["upgrade",11],["upgrade",12],["upgrade",13]]],
                ["row",[["upgrade",21],["upgrade",22],["upgrade",23]]]
            ],
            
        },
        "Exploration": {
            unlocked() {return (hasUpgrade("ba", 23))},
            content: [
                ["infobox", "marsexplore"],
                ["display-text",
                function() {return 'You have ' + format(player.ba.rocks) + ' Mars Rocks'},
                {"color": "red" , "font-size": "20px"}],
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
                "blank",
                ["row",[["upgrade",31],["upgrade",32]]]
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
        11: {
            title: "Mars Rocks", // Optional, displayed at the top in a larger font
            cost(x) { return new Decimal(35).mul(x).mul(1.25).div(player.ba.half1) },
            display() { // Everything else displayed in the buyable button after the title
                return " You explore and only find mars rocks the most common thing in the vast expanse of mars\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power \n\
                Amount:"  + player[this.layer].buyables[this.id] + " Mars Rocks"
                
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.rocks = player.ba.rocks.add(1)
            },

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
            description: "Inspecting the robots.... And... Ok they seem to be in perfect condition. (x1.5 energy gain)",
            cost: new Decimal(5),
        },
        13: {
            title: "Latest Bolts",
            description: "Man... I didn't know amazon sold these futurisitc bolts. (x2 energy gain)",
            cost: new Decimal(10),
        },
        21: {
            title: "New Wrench",
            description: "I need a new wrench (x2 energy gain)",
            cost: new Decimal(10),
            unlocked() { return (hasUpgrade(this.layer, 13))}, 
        },
        22: {
            title: "POWER",
            description: "The pure power is getting STRONGER! (Pure power boosts energy gain",
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
            unlocked() { return (player.ba.rocks.gte(1)) || (hasUpgrade("ba",23))}, 
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

        }
    }

}),
addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🏆", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
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
    }
})
