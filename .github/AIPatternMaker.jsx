// Seamless Textile Pattern Creation Script
// Author: [Your Name]
// Description: Automates the creation of a seamless textile pattern by combining Layer A (camouflage) and Layer B (randomly placed Symbols) in Adobe Illustrator.

#target illustrator

// Main Function
function createSeamlessPattern() {
    try {
        // Set up the document and layers
        var doc = app.activeDocument;
        var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
        var artboardRect = artboard.artboardRect;
        var artboardWidth = artboardRect[2] - artboardRect[0];
        var artboardHeight = artboardRect[1] - artboardRect[3];

        // Check for Symbols
        if (doc.symbols.length === 0) {
            throw new Error("No symbols found in the Symbols panel. Please add floral symbols before running this script.");
        }

        // Prompt the user for parameters
        var symbolCount = parseInt(prompt("10", 50), 10);
        var rotationRange = parseInt(prompt("66”):", 30), 10);
        var placementOffset = parseInt(prompt("400", 100), 10);

        if (isNaN(symbolCount) || isNaN(rotationRange) || isNaN(placementOffset)) {
            throw new Error("Invalid input. Please enter numeric values for all parameters.");
        }

        // Create Layer A (Camouflage)
        var layerA = doc.layers.add();
        layerA.name = "Layer A - Camouflage";
        var camoSwatch = doc.swatches.getByName("Camouflage Pattern"); // Replace with your swatch name
        if (!camoSwatch) {
            throw new Error("Camouflage swatch not found. Please ensure the swatch is named 'Camouflage Pattern'.");
        }

        var rect = doc.pathItems.rectangle(
            artboardRect[1],
            artboardRect[0],
            artboardWidth,
            artboardHeight
        );
        rect.fillColor = camoSwatch.color;
        rect.stroked = false;
        rect.move(layerA, ElementPlacement.PLACEATEND);

        // Create Layer B (Floral Overlay)
        var layerB = doc.layers.add();
        layerB.name = "Layer B - Floral Symbols";

        for (var i = 0; i < symbolCount; i++) {
            // Randomly select a symbol from the Symbols panel
            var randomSymbol = doc.symbols[Math.floor(Math.random() * doc.symbols.length)];
            var symbolInstance = layerB.symbolItems.add(randomSymbol);

            // Randomize placement within the artboard
            var xOffset = Math.random() * artboardWidth - artboardWidth / 2;
            var yOffset = Math.random() * artboardHeight - artboardHeight / 2;
            symbolInstance.position = [artboardRect[0] + artboardWidth / 2 + xOffset, artboardRect[1] - artboardHeight / 2 + yOffset];

            // Randomize rotation
            var rotation = Math.random() * (rotationRange * 2) - rotationRange; // Random rotation between -range and +range
            symbolInstance.rotate(rotation);
        }

        // Combine Layers and Export Pattern Swatch
        app.executeMenuCommand("selectall");
        app.executeMenuCommand("group");
        doc.selection[0].name = "Seamless Pattern Group";

        // Create and save the pattern swatch
        var patternSwatch = doc.swatches.add();
        patternSwatch.name = "Seamless Pattern";
        patternSwatch.color = doc.selection[0];

        // Cleanup and Notifications
        doc.selection = null;
        alert("Seamless pattern created successfully! Check the Swatches panel for 'Seamless Pattern'.");
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Run the Script
createSeamlessPattern();
