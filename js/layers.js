



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
        as: new Decimal(0),
        bd1: new Decimal(3),
        bd2: new Decimal(3.5),
        bdm: new Decimal(1),
        bdm2: new Decimal(1),
        water: new Decimal(1),
        dirt: new Decimal(1),
        air: new Decimal(1),
        en: new Decimal(0),
        ea: new Decimal(1),
        emb: new Decimal(1), // Mars rocks enhancement boost
        emb2: new Decimal(1),
        obdm: new Decimal(0),
        obdm2: new Decimal(0),
        bdm3: new Decimal(1)
      
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
        if (hasUpgrade(this.layer, 84)) mult = mult.times(upgradeEffect(this.layer, 84))
        if (hasUpgrade("o", 14)) mult = mult.times(upgradeEffect("o", 14))
        if (hasUpgrade("ba", 102)) mult = mult.times(upgradeEffect("ba", 102))
        if (hasUpgrade("ba", 113)) mult = mult.times(upgradeEffect("ba", 113))
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
        let keptUpgrades = []
        if (hasUpgrade(this.layer, 115)) keptUpgrades.push(115)
        let keep = [];
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
            player[this.layer].upgrades.push(keptUpgrades)
    
},  

passiveGeneration(){return hasUpgrade("ba",51)},
update() {

   
     if (hasUpgrade("ba",44))  player.ba.rocks = player.ba.rocks.add(0.01)
     if (hasUpgrade("ba",52))  player.ba.rocks = player.ba.rocks.add(player.ba.bact.mul(player.ba.emb).div(player.ba.bd1).mul(player.ba.bdm))
     if (hasUpgrade("ba",53)) player.ba.sand = player.ba.sand.add(0.01)
     if (hasUpgrade("ba",91)) player.ba.bact = player.ba.bact.add(0.1)
     if (hasUpgrade("ba",112)) player.ba.dirt = player.ba.dirt.add(0.1)
     if (hasUpgrade("ba",131)) player.ba.emb = player.ba.en
     if (hasUpgrade("ba",131)) player.ba.emb2 = player.ba.en.div(1.5)
     if (hasUpgrade("ba",114)) player.ba.water = player.ba.water.add(0.1)
     if (hasUpgrade("ba",92)) player.ba.bact = player.ba.bact.add(player.o.points.mul(player.ba.bdm3))
     if (hasUpgrade("ba",45) && player.ba.as.gte(1)) player.ba.sand = player.ba.sand.add(player.ba.bact.mul(player.ba.emb2).div(player.ba.bd2).mul(player.ba.bdm2))
     if (player.ba.bdm2 == 0) player.ba.bdm2.add(2)
     if (hasUpgrade("ba",141)) player.ba.air = player.ba.air.add(0.1)
     if (hasUpgrade("ba",142)) player.ba.dirt = player.ba.dirt.add(player.ba.air.mul(player.ba.air.div(1e3)))
     if (hasUpgrade("ba",143)) player.ba.water = player.ba.water.add(player.ba.air.mul(player.ba.air.div(1e4)))
     if (hasUpgrade("ba",144)) player.ba.air = player.ba.air.add(player.ba.air.div(100))
     if (player.ba.air.gte(1e12)) player.ba.air = new Decimal(1e12)
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
                ["display-text",
                    function() {return 'You have ' + format(player.ba.water) + ' Water Molecules'},
                    {"color": "cyan" , "font-size": "20px"}],
                ["display-text",
                    function() {return 'You have ' + format(player.ba.dirt) + ' Mars Dirt'},
                    {"color": "brown" , "font-size": "20px"}],
                ["display-text",
                        function() {return 'You have ' + format(player.ba.air) + ' Air'},
                        {"color": "white" , "font-size": "20px"}],
                "blank",
                "respec-button",
                ["row",[["buyable",11],["buyable",12],["buyable",13]]],
                ["row",[["buyable",21],["buyable",22],["buyable",23]]],
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
                ["display-text",
                    function() {return 'You have ' + format(player.ba.water) + ' Water Molecules'},
                    {"color": "cyan" , "font-size": "20px"}],
                    ["display-text",
                        function() {return 'You have ' + format(player.ba.dirt) + ' Mars Dirt'},
                        {"color": "brown" , "font-size": "20px"}],
               ["display-text",
                   function() {return 'You have ' + format(player.ba.air) + ' Air'},
                    {"color": "white" , "font-size": "20px"}],
                "blank",
                ["row",[["clickable",11]]],
                "blank",
                ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34],["upgrade",35]]],
                ["row",[["upgrade",71],["upgrade",72],["upgrade",73],["upgrade",74],["upgrade",75]]],
                ["row",[["upgrade",41],["upgrade",42],["upgrade",43],["upgrade",44],["upgrade",45]]],
                ["row",[["upgrade",81],["upgrade",82],["upgrade",83],["upgrade",84],["upgrade",85]]],
                ["row",[["upgrade",51],["upgrade",52],["upgrade",53],["upgrade",54],["upgrade",55]]],
                ["row",[["upgrade",91],["upgrade",92],["upgrade",93],["upgrade",94],["upgrade",95]]],
                ["row",[["upgrade",101],["upgrade",102],["upgrade",103],["upgrade",104],["upgrade",105]]],
                ["row",[["upgrade",111],["upgrade",112],["upgrade",113],["upgrade",114],["upgrade",115]]],
                ["row",[["upgrade",141],["upgrade",142],["upgrade",143],["upgrade",144],["upgrade",145]]]
            ],
            
        },
        "Enhancements": {
            unlocked() {return (hasUpgrade("ba", 115))},
            content: [
                ["infobox", "enhance"],
                ["display-text",
                    function() {return 'You have ' + format(player.ba.en) + ' Enhancement Crystals'},
                     {"color": "purple" , "font-size": "20px"}],
                ["row",[["buyable",51]]],
                "blank",
                ["row",[["clickable",21]]],
                "blank",
                ["row",[["clickable",31],["clickable",32],["clickable",33]]],
                "blank",
                "blank",
                ["row",[["upgrade",131],["upgrade",132],["upgrade",133],["upgrade",134]]]
            ]
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
        enhance: {
            title: "DOCUMENT ENH000001",
            titleStyle: {'color': '#000000'},
            body() { return "These are enhancement crystals. They will enhance materials and will make it stronger. (When you respec it will also reset enhancement crystals)" },
            bodyStyle: {'background-color': "#4A2121"}
            
        },
        
    },
    buyables: {
        showRespec: true,
        respec() { // Optional, reset things and give back your currency. Having this function makes a respec button appear

            resetBuyables(this.layer),
            player.ba.rocks = new Decimal(1)
            player.ba.sand = new Decimal(1)
            player.ba.bact = new Decimal(1)
            player.ba.water = new Decimal(1)
            player.ba.dirt = new Decimal(1)
            player.ba.en = new Decimal(1)
            player.ba.air = new Decimal(1) // Force a reset
           
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
        21: {
            title: "Water Molecules", // Optional, displayed at the top in a larger font
            cost(x) { return new Decimal(1e14).mul(x).mul(1.5)},
            display() { // Everything else displayed in the buyable button after the title
                return " In the air there are water molecules. They are very rare but will help enhance energy even further (Water molecules boost energy gain)\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.water = player.ba.water.add(1)
            },
            unlocked() { return  (hasUpgrade("ba",75))}
        },
        22: {
            title: "Mars dirt", // Optional, displayed at the top in a larger font
            cost(x) { return new Decimal(5e16).mul(x).mul(1.75)},
            display() { // Everything else displayed in the buyable button after the title
                return " The ground is a simple combination of molecules but this can be harvested for energy (dirt boosts energy gain)\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.dirt = player.ba.dirt.add(1)
            },
            unlocked() { return  (hasUpgrade("ba",85)) || (hasUpgrade("ba",111))}
        },
        23: {
            title: "Air", // Optional, displayed at the top in a larger font
            cost(x) { return new Decimal(1e25).mul(x).mul(4)},
            display() { // Everything else displayed in the buyable button after the title
                return " Air is everywhere (Air boosts energy gain)\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.air = player.ba.air.add(1)
            },
            unlocked() { return  (hasUpgrade("ba",95))}
        },
        51: {
            title: "ENHANCEMENT CRYSTAL", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(1e29)
                let amt = getBuyableAmount("ba", 51)
                let exp = amt.div(10)
                return init.pow(exp)
            },
            display() { // Everything else displayed in the buyable button after the title
                return " Enhancement crystals resets all mars materials are you sure you want to get one?\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            style: {
                "background-color"() {

                    let color = "#C800FD"
                    return color
                    
                }
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.en = player.ba.en.add(1)
                player.ba.rocks = new Decimal(0)
                player.ba.sand = new Decimal(0)
                player.ba.bact = new Decimal(0)
                player.ba.air = new Decimal(0)
                player.ba.water = new Decimal(0)
                player.ba.dirt = new Decimal(0)
               
            }
        }
    },
    clickables: {
        11: {
            display() {return "RESET UPGRADES"},
            canClick() {return true},
            onClick() {
                player.ba.upgrades = ["reset"]
                player.ba.as = player.ba.as = new Decimal(0)
            },
            
        },

        21: {
            display() {return "RESET ENHANCEMENTS (THIS WILL RESET ALL MATERIALS)"},
            canClick() {if (player.ba.ea == 1) return true},
            onClick() {
                player.ba.ea = new Decimal(0)
                player.ba.en = player.ba.en.add(1)
                player.ba.bdm = player.ba.obdm
                player.ba.bdm2 = player.ba.obdm2
                player.ba.rocks = player.ba.rocks = new Decimal(1)
                player.ba.sand = player.ba.sand = new Decimal(1)
                player.ba.bact = player.ba.bact = new Decimal(1)
                player.ba.air = player.ba.air = new Decimal(1)
                player.ba.dirt = player.ba.dirt = new Decimal(1)
                player.ba.water = player.ba.water = new Decimal(1)
                player.ba.bdm3 = player.ba.bdm3 = new Decimal(1)
            },
            style: {
                "background-color"() {

                    let color = "#C800FD"
                    return color
                    
                }
            },
            
        },
        31: {
            display() {return "MARS ROCK ENHANCEMENT"},
            canClick() {if (player.ba.ea == 0 && player.ba.en.gte(1)) return true},
            onClick() {
                    player.ba.obdm = new Decimal(player.ba.bdm)
                    player.ba.ea = new Decimal(1)
                    player.ba.en = player.ba.en.sub(1)
                    player.ba.bdm = player.ba.bdm = new Decimal(1e9)
                    },
            style: {
                "background-color"() {
                    let color = "#C800FD"
                    return color
                    
                }
            },
            
        },
        32: {
            display() {return "MARS SAND ENHANCEMENT"},
            canClick() {if (player.ba.ea == 0 && player.ba.en.gte(1)) return true},
            onClick() {
                    player.ba.obdm2 = new Decimal(player.ba.bdm2)
                    player.ba.ea = new Decimal(1)
                    player.ba.en = player.ba.en.sub(1)
                    player.ba.bdm2 = player.ba.bdm2 = new Decimal(1e9)
            },
            style: {
                "background-color"() {
                    let color = "#C800FD"
                    return color
                    
                }
            },
            
        },
        33: {
            display() {return "BACTERIA SAMPLES ENHANCEMENT"},
            canClick() {if (player.ba.ea == 0 && player.ba.en.gte(1)) return true},
            onClick() {
                    player.ba.ea = new Decimal(1)
                    player.ba.en = player.ba.en.sub(1)
                    player.ba.bdm3 = player.ba.bdm3 = new Decimal(100)
            },
            style: {
                "background-color"() {
                    let color = "#C800FD"
                    return color
                    
                }
            },
            
        }
        
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
            },
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",31)) color = "#A70000"
                    return color
                    
                }
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
             style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",32)) color = "#A70000"
                    return color
                    
                }
            },
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
            unlocked() { return (hasUpgrade("ba",32))},
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",33)) color = "#A70000"
                    return color
                    
                }
            }
        },
        34: {
            title: "Extensive Research",
            description: "These mars rocks could be used to harvest so much energy... If only there were a way... (x3 energy gain)",
            cost: new Decimal(7),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",33))},
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",34)) color = "#A70000"
                    return color
                    
                }
            }
        },
        35: {
            title: "Potential",
            description: "There has to be a way to refine these rocks into ores.. Or what if there are ores on mars! I have to start worrying about oxygen soon... (x3 energy gain again)",
            cost: new Decimal(10),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",34))},
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",35)) color = "#A70000"
                    return color
                    
                }
            }
        },
        71: {
            title: "Rock energy conversion I",
            description: "The mars rocks true potential is drawing ever closer I just need some sort of amplifier... (Mars rocks boost energy gain)",
            cost: new Decimal(5e6),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            effect() {
                return player.ba.rocks.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",71)) color = "#A70000"
                    return color
                    
                }
            }
        },
        72: {
            title: "Rock energy conversion II",
            description: "Bacteria seems to be more powerful its mulitplying so quickly! (Bacteria boosts mars rocks better)",
            cost: new Decimal(1e7),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            onPurchase() {
                player.ba.bd1 = new Decimal(2)
            },
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",72)) color = "#A70000"
                    return color
                    
                }
            }
        },
        73: {
            title: "Rock energy conversion III",
            description: "Bacteria... power... YES.... (Bacteria boosts mars rocks even better)",
            cost: new Decimal(1.5e7),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            onPurchase() {
                player.ba.bd1 = new Decimal(1.25)
                player.ba.bdm = new Decimal(5)
            },
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",73)) color = "#A70000"
                    return color
                    
                }
            }
        },
        74: {
            title: "Rock energy conversion IV",
            description: "This is the maximum potential... finally! (Bacteria boosts mars rocks much better)",
            cost: new Decimal(3e7),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            onPurchase() {
                player.ba.bd1 = new Decimal(1.1)
                player.ba.bdm = new Decimal(15)
            },
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",74)) color = "#A70000"
                    return color
                    
                }
            }
        },
        75: {
            title: "Water Molecules",
            description: "There seems to be some water molecules around the place (Unlock new mars material)",
            cost: new Decimal(6e7),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",75)) color = "#A70000"
                    return color
                    
                }
            }
        },
        41: {
            title: "Sand filter",
            description: "Now that we have higher quality sand I can turn it into energy (Sand boosts energy)",
            cost: new Decimal(3),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",33))},
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",41)) color = "#D0BE8A"
                    return color
                    
                }
            },
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
            },
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",42)) color = "#D0BE8A"
                    return color
                    
                }
            },
           
        },
        43: {
            title: "Bacteria samples",
            description: "Its time to find bacteria samples! (unlock bacteria samples)",
            cost: new Decimal(5),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",34))},
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",43)) color = "#D0BE8A"
                    return color
                    
                }
            },
        },
        44: {
            title: "Rock Drones",
            description: "Drones are now collecting rocks for you easier",
            cost: new Decimal(10),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",34))},
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",44)) color = "#D0BE8A"
                    return color
                    
                }
            },
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
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",45)) color = "#D0BE8A"
                    return color
                    
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        81: {
            title: "Sand energy conversion I",
            description: "The sand is more powerful (Bacteria boosts mars sand)",
            cost: new Decimal(3e6),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            onPurchase() {
                player.ba.bd2 = new Decimal(2.8)
                player.ba.bdm2 = new Decimal(1.3)
            },
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",81)) color = "#D0BE8A"
                    return color
                    
                }
            },
           
        },
        82: {
            title: "Sand energy conversion II",
            description: "The sand is even more powerful (Bacteria boosts mars sand even more)",
            cost: new Decimal(5e6),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            onPurchase() {
                player.ba.bd2 = new Decimal(2.5)
                player.ba.bdm2 = new Decimal(2)
            },
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",82)) color = "#D0BE8A"
                    return color
                    
                }
            },
           
        },
        83: {
            title: "Sand energy conversion III",
            description: "The sand is so powerful (Bacteria boosts mars sand so much more)",
            cost: new Decimal(5e6),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            onPurchase() {
                player.ba.bd2 = new Decimal(1.5)
                player.ba.bdm2 = new Decimal(4)
            },
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",83)) color = "#D0BE8A"
                    return color
                    
                }
            },
           
        },
        84: {
            title: "Sand energy conversion IV",
            description: "The pure power is now sand? Uhhhhhhhh.  (Sand boosts pure power)",
            cost: new Decimal(2e7),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            effect() {
                return player.ba.water.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",84)) color = "#D0BE8A"
                    return color
                    
                }
            },
           
        },
        85: {
            title: "Ground",
            description: "The rover can now dig up mars dirt (unlock a new mars material)",
            cost: new Decimal(3e7),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",85)) color = "#D0BE8A"
                    return color
                    
                }
            },
           
        },
        51: {
            title: "Pure Harvesting",
            description: "Pure power is now easier to harvest with new technology. (100% automatic gain for Pure Power)",
            cost: new Decimal(2),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))},
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",51)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        52: {
            title: "Bacteria Rocks",
            description: "Bacteria seems to enhance the rocks giving it more energy (Bacteria boosts mars rocks gain)",
            cost: new Decimal(8),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))},
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",52)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        53: {
            title: "Sand Drones",
            description: "Drones will now carry sand as well (gain 0.01 sand automatically)",
            cost: new Decimal(15),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))},
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",53)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        54: {
            title: "New POWER",
            description: "There is more ENERGY THE POWER INCREASES!",
            cost: new Decimal(17),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))},
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",54)) color = "#0E8A0E"
                    return color
                    
                }
            },
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
            },
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",55)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        91: {
            title: "Automatic collection",
            description: "Drones will collect samples automatically (Gain 0.1 bacteria samples/s)",
            cost: new Decimal(2000),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",13))},
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",91)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        92: {
            title: "Oxygen injection",
            description: "injecting oxygen makes bacteria multiply (Gain bacteria samples based on oxygen)",
            cost: new Decimal(2100),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",13))},
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",92)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        93: {
            title: "BACTERIA MUTATION I",
            description: "There is a new mutation of this bacteria it seems to have adapted to this enviorment (Gain more mars rocks)",
            cost: new Decimal(2e5),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",13))},
            onPurchase() {
                player.ba.bdm = new Decimal(30)
            },
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",93)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        94: {
            title: "BACTERIA MUTATION II",
            description: "There are new mutation of this bacteria (Gain even more mars rocks)",
            cost: new Decimal(4e5),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",13))},
            onPurchase() {
                player.ba.bdm = new Decimal(50)
            },
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",94)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        95: {
            title: "BACTERIA MUTATION III",
            description: "MUTATE (Gain even more mars rocks and unlock a new mars material)",
            cost: new Decimal(5e5),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",13))},
            onPurchase() {
                player.ba.bdm = new Decimal(3e4)
            },
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",95)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        101: {
            title: "Water power",
            description: "Water molecules enhance energy (Water molecules boosts energy)",
            cost: new Decimal(95),
            currencyInternalName: "water",
            currencyDisplayName: "Water Molecules",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",75))},
            effect() {
                return player.ba.water.add(1).pow(0.63)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#75F9F3"
                    if (hasUpgrade("ba",101)) color = "#02E3FF"
                    return color
                    
                }
            },
        },
        102: {
            title: "Pure water power",
            description: "Water molecules enhance pure energy (Water molecules boosts energy)",
            cost: new Decimal(130),
            currencyInternalName: "water",
            currencyDisplayName: "Water Molecules",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",75))},
            effect() {
                return player.ba.water.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#75F9F3"
                    if (hasUpgrade("ba",102)) color = "#02E3FF"
                    return color
                    
                }
            },
        },
        103: {
            title: "[???]",
            description: "[REDACTED]",
            cost: new Decimal(1200),
            currencyInternalName: "water",
            currencyDisplayName: "Water Molecules",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",75))},
            style: {
                "background-color"() {

                    let color = "#75F9F3"
                    if (hasUpgrade("ba",103)) color = "#02E3FF"
                    return color
                    
                }
            },
        },
        104: {
            title: "Operation: RESTORATION",
            description: "You've gotten so far... Now its time to make mars habitable",
            cost: new Decimal(0),
            currencyInternalName: "water",
            currencyDisplayName: "Water Molecules",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",103))},
            style: {
                "background-color"() {

                    let color = "#75F9F3"
                    if (hasUpgrade("ba",104)) color = "#02E3FF"
                    return color
                    
                }
            },
        },
        105: {
            title: "Enviorment",
            description: "Unlock enviorment (Coming soon)",
            cost: new Decimal(0),
            currencyInternalName: "water",
            currencyDisplayName: "Water Molecules",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",104))},
            style: {
                "background-color"() {

                    let color = "#75F9F3"
                    if (hasUpgrade("ba",105)) color = "#02E3FF"
                    return color
                    
                }
            },
        },
        111: {
            title: "Dirt Power",
            description: "The dirt also enhances energy yay (dirt boosts energy)",
            cost: new Decimal(150),
            currencyInternalName: "dirt",
            currencyDisplayName: "Mars Dirt",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",95))},
            effect() {
                return player.ba.water.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#8A5B4C"
                    if (hasUpgrade("ba",111)) color = "#A0330F"
                    return color
                    
                }
            },
        },
        112: {
            title: "Dirt Collecter Drones",
            description: "Drones now have the capability to collect dirt (Automatically gain 0.1 dirt/s)",
            cost: new Decimal(300),
            currencyInternalName: "dirt",
            currencyDisplayName: "Mars Dirt",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",95))},
            style: {
                "background-color"() {

                    let color = "#8A5B4C"
                    if (hasUpgrade("ba",112)) color = "#A0330F"
                    return color
                    
                }
            },
        },
        113: {
            title: "Pure Dirt Power",
            description: "The dirt enhances pure energy too (dirt boosts pure energy)",
            cost: new Decimal(650),
            currencyInternalName: "dirt",
            currencyDisplayName: "Mars Dirt",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",95))},
            effect() {
                return player.ba.water.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#8A5B4C"
                    if (hasUpgrade("ba",113)) color = "#A0330F"
                    return color
                    
                }
            },
        },
        114: {
            title: "Automatic water collection",
            description: "Drones collect water molecules (gain 0.1 water molecule/s)",
            cost: new Decimal(800),
            currencyInternalName: "dirt",
            currencyDisplayName: "Mars Dirt",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",95))},
            style: {
                "background-color"() {

                    let color = "#8A5B4C"
                    if (hasUpgrade("ba",114)) color = "#A0330F"
                    return color
                    
                }
            },
        },
        115: {
            title: "ENHANCEMENT",
            description: "with these machines I can enhance the materials (Unlock the enhancement tab)",
            cost: new Decimal(1e3),
            currencyInternalName: "dirt",
            currencyDisplayName: "Mars Dirt",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",95))},
            style: {
                "background-color"() {

                    let color = "#8A5B4C"
                    if (hasUpgrade("ba",115)) color = "#A0330F"
                    return color
                    
                }
            },
        },
        131: {
            title: "MAXIMIZE I",
            description: "Enhancement cystals enhance mars rocks",
            cost: new Decimal(5),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
             effectDisplay() { return format(player.ba.en)+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",131)) color = "#C411FF"
                    return color
                    
                }
            },
        },
        132: {
            title: "MAXIMIZE II",
            description: "Enhancement cystals enhance mars sand",
            cost: new Decimal(10),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
             effectDisplay() { return format(player.ba.en.div(1.5)) +"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",132)) color = "#C411FF"
                    return color
                    
                }
            },
        },
        133: {
            title: "BOOST I",
            description: "Boost sand",
            cost: new Decimal(3),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
            onPurchase() {
                player.ba.bdm2 = player.ba.bdm2 = new Decimal(1e3)
            },
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",133)) color = "#C411FF"
                    return color
                    
                }
            },
        },
        134: {
            title: "BOOST II",
            description: "Boost mars rocks",
            cost: new Decimal(15),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
            onPurchase() {
                player.ba.bdm = player.ba.bdm.add(1e6)
            },
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",134)) color = "#C411FF"
                    return color
                    
                }
            },
        },
        141: {
            title: "Air flow",
            description: "Air is automatically collected (gain 0.1 air/s)",
            cost: new Decimal(50),
            currencyInternalName: "air",
            currencyDisplayName: "Air",
            currencyLayer: "ba",
            unlocked() {hasUpgrade("ba",95)},
            style: {
                "background-color"() {

                    let color = "#FDFFFE"
                    if (hasUpgrade("ba",141)) color = "#BFBFBF"
                    return color
                    
                }
            },
        },
        142: {
            title: "Dirt flow",
            description: "Air flows through the dirt making the dirt stronger??? idk (Air boosts dirt)",
            cost: new Decimal(75),
            currencyInternalName: "air",
            currencyDisplayName: "Air",
            currencyLayer: "ba",
            unlocked() {hasUpgrade("ba",95)},
            style: {
                "background-color"() {

                    let color = "#FDFFFE"
                    if (hasUpgrade("ba",142)) color = "#BFBFBF"
                    return color
                    
                }
            },
        },
        143: {
            title: "Water flow",
            description: "Air flows through the water making the water store more energy (Air boosts water)",
            cost: new Decimal(200),
            currencyInternalName: "air",
            currencyDisplayName: "Air",
            currencyLayer: "ba",
            unlocked() {hasUpgrade("ba",95)},
            style: {
                "background-color"() {

                    let color = "#FDFFFE"
                    if (hasUpgrade("ba",143)) color = "#BFBFBF"
                    return color
                    
                }
            },
        },
        144: {
            title: "Flowing flow",
            description: "Air flows through the air making the air store more energy  (Air boosts air)",
            cost: new Decimal(500),
            currencyInternalName: "air",
            currencyDisplayName: "Air",
            unlocked() {hasUpgrade("ba",95)},
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#FDFFFE"
                    if (hasUpgrade("ba",144)) color = "#BFBFBF"
                    return color
                    
                }
            },
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
        ot: new Decimal(100),
        ol: new Decimal(0.1)
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
    update(diff) {
        if (player.o.points.gte(1)) player.o.ot = player.o.ot.sub(player.o.ol*diff)
        if (player.o.ot < 1) player.o.ot = new Decimal(0)
        if (player.o.ot < 1) player.points = new Decimal(0)
        
    },
    branches: ['ba'],
    resetsNothing() {return true},
    canBuyMax() {return hasUpgrade("o",15)},
    bars: {
    oxygentank: {
        fillStyle: {'background-color' : "#2D6BB1"},
        baseStyle: {'background-color' : "#000756"},
        textStyle: {'text-shadow': '0px 0px 2px #000000'},

        borderStyle() {return {'border-width': "4px"}},
        direction: UP,
        width: 60,
        height: 250,
        progress() {
            return player.o.ot.div(100)
        },
        display() {
            return formatWhole((player.o.ot.div(1)).min(100))
        },
        unlocked: true
    },
},
clickables: {
    11: {
        display() {return "RESET OXYGEN TANKS"},
        canClick() {if (player.o.points.gte(0)) return true},
        onClick() {return player.o.ot = new Decimal(100)}
        
    }
    
},
    tabFormat: {
        "IMPORTANT": {
            content: [
                ["infobox", "oxygeninfo"],
                "main-display",
                "prestige-button",
                "blank",
                ["bar", "oxygentank"], "blank",
                "clickables"
            ],
            
        },
        "OXYGEN UPGRADES": {
            content: [
                ["infobox", "oxygeninfo2"],
                "blank",
                ["row",[["upgrade",11],["upgrade",12],["upgrade",13],["upgrade",14],["upgrade",15]]]
                
            ],
            
        },
    },
    upgrades: {
        11: {
            title: "Tank repair",
            description: "Now that the tank has been repaired the oxygen wont run out quickly",
            cost: new Decimal(1),
            onPurchase() {
                player.o.ol = new Decimal(0.09)
            }
        },
        12: {
            title: "New Research",
            description: "Now we can explore and collect new samples. (Unlock new mars materials upgrades)",
            cost: new Decimal(2)
        },
        13: {
            title: "Oxygen Flow",
            description: "Oxygen flows through energy enhancing it (Oxygen boosts energy)",
            cost: new Decimal(10),
            effect() {
                return player.o.points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Pure Oxygen Flow",
            description: "Oxygen flows through pure energy enhancing it (Oxygen boosts pure energy)",
            cost: new Decimal(35),
            effect() {
                return player.o.points.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "SUPER TANK DELUXE",
            description: "This new tank can hold so much oxygen! (You can max buy oxygen)",
            cost: new Decimal(330)
        },
    },
    infoboxes: {
        oxygeninfo: {
            title: "DOCUMENT 000000O1",
            titleStyle: {'color': '#2D6BB1'},
            body() { return "Your starting to run out of oxygen but there is no need to worry. When your oxygen runs out your energy production comes to a halt but you can refresh your oxygen tanks very easily but that will be a tedious task so its time to grow plants!" },
            bodyStyle: {'background-color': "#000756"}
            
            
        },
        oxygeninfo2: {
            title: "DOCUMENT 000000O2",
            titleStyle: {'color': '#2D6BB1'},
            body() { return "Well its gonna be too difficult to constantly refresh your oxygen tanks so with the new amounts of energy you harvested its time to make this easier." },
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
        },
        27: {
            name: "AIR!",
            tooltip: "Get 1 Oxygen",
            done(){return player.o.points.gte(1)} 
        },
        31: {
            name: "Water",
            tooltip: "Get 5 water molecules",
            done(){return player.ba.water.gte(5)} 
        },
        32: {
            name: "Full tank",
            tooltip: "Get 30 oxygen",
            done(){return player.o.points.gte(30)} 
        },
        33: {
            name: "Many molecules",
            tooltip: "Get 500 water molecules",
            done(){return player.ba.water.gte(500)} 
        },
        34: {
            name: "Just dirt.",
            tooltip: "Get 5 Mars Dirt",
            done(){return player.ba.dirt.gte(5)} 
        },
        35: {
            name: "MULTIPLY",
            tooltip: "Get 1e6 bacteria",
            done(){return player.ba.bact.gte(1e6)} 
        },
        36: {
            name: "100 Tanks",
            tooltip: "Get 100 oxygen",
            done(){return player.o.points.gte(100)} 
        },
        37: {
            name: "Who's the real one?",
            tooltip: "Get 5 air",
            done(){return player.ba.air.gte(5)} 
        },
        41: {
            name: "Enhance!",
            tooltip: "Get 5 enhancement crystals",
            done(){return player.ba.en.gte(5)} 
        },
        42: {
            name: "Enhancements",
            tooltip: "Get 15 enhancement crystals",
            done(){return player.ba.en.gte(15)} 
        },
        43: {
            name: "Fresh air",
            tooltip: "Get 500 oxygen",
            done(){return player.o.points.gte(500)} 
        }
    }
})
