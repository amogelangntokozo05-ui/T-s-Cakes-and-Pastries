/* =========================================================================
   T's Cakes and Pastries - Product Catalog Database
   ========================================================================= */

const PRODUCT_CATALOG = [
    {
        id: "cake-signature",
        title: "Signature Cakes",
        price: 450,
        priceText: "Prices start from R450",
        desc: "We craft custom-designed cakes for all occasions. Our master bakers specialize in multi-tiered wedding cakes, novelty birthday designs, and elegant corporate centerpieces.",
        category: "cakes",
        img: "images/Cake114.jpg",
        alt: "Custom designed tiered wedding and birthday celebration cakes with pink icing by T's Cakes Sandton",
        bullets: [
            "Classic Vanilla Sponge & Chocolate Truffle",
            "Red Velvet with Cream Cheese Frosting",
            "Vegan & Gluten-Free options available"
        ]
    },
    {
        id: "cake-belgian",
        title: "Belgian Chocolate Ganache",
        price: 480,
        priceText: "Prices start from R480",
        desc: "Indulge in pure chocolate bliss. This premium cake features three layers of rich chocolate sponge filled with luxurious Belgian truffle ganache and glazed to absolute perfection.",
        category: "cakes",
        img: "images/Cake7.jpg",
        alt: "Rich dark Belgian chocolate ganache custom celebration cake by T's Cakes",
        bullets: [
            "70% Dark Imported Belgian Cocoa",
            "Silky chocolate truffle icing",
            "Topped with handmade chocolate curls"
        ]
    },
    {
        id: "cake-redvelvet",
        title: "Red Velvet Grandeur",
        price: 460,
        priceText: "Prices start from R460",
        desc: "A classic red velvet cake, meticulously baked to be incredibly moist and light. Frosted with our signature sweet cream cheese icing and decorated with golden crumbs.",
        category: "cakes",
        img: "images/Cake887.jpg",
        alt: "Gourmet red velvet custom birthday cake with cream cheese frosting",
        bullets: [
            "Moist crimson cocoa layers",
            "Whipped cream cheese frosting",
            "Perfect for birthdays and romantic events"
        ]
    },
    {
        id: "breads-scones",
        title: "Baked Loaves & Scones",
        price: 45,
        priceText: "Prices start from R45 / batch",
        desc: "Freshly baked bread with a crispy crust and soft center. Our scones are a local community legend, baked fresh every two hours so they are always served warm.",
        category: "breads",
        img: "images/Scones668.jpg",
        alt: "Golden brown traditional buttermilk scones served fresh with fruit jam at T's Cakes Rosebank",
        bullets: [
            "Traditional Buttermilk Scones",
            "Cheese & Chive Savory Scones",
            "Artisanal Sourdough Loaves"
        ]
    },
    {
        id: "breads-sconepack",
        title: "Artisanal Scones Pack",
        price: 90,
        priceText: "Prices start from R90 / pack of 6",
        desc: "Our legendary buttermilk scones, freshly baked in-store. This pack of six golden rounds is perfect for high tea, morning meetings, or a cozy Sunday brunch.",
        category: "breads",
        img: "images/Scones665.jpg",
        alt: "Freshly baked buttermilk scones served on a wooden board with jam",
        bullets: [
            "Extremely light and buttery centers",
            "Includes individual strawberry jams",
            "Served warm in custom bakery boxes"
        ]
    },
    {
        id: "breads-sourdough",
        title: "Farmhouse Sourdough",
        price: 50,
        priceText: "Prices start from R50 / loaf",
        desc: "Classic country farmhouse sourdough bread, slowly fermented and stone-baked daily. Incredible when sliced thick, toasted, and spread with farm butter.",
        category: "breads",
        img: "images/Scones458.jpg",
        alt: "Artisanal country sourdough loaf with a crispy rustic crust",
        bullets: [
            "36-hour slow fermentation",
            "Crunchy rustic caramelized crust",
            "100% natural wild yeast culture"
        ]
    },
    {
        id: "pastries-premium",
        title: "Premium Pastries",
        price: 25,
        priceText: "Prices start from R25 / pastry",
        desc: "From flaky croissants to sweet Danishes, our pastries are rolled and folded completely by hand using imported European butter for that signature, golden crispness.",
        category: "pastries",
        img: "images/pastries1102.jpg",
        alt: "Golden hand-rolled buttery danish pastries and croissants in display tray at T's Cakes and Pastries",
        bullets: [
            "Hand-folded Butter Croissants",
            "Fruit & Custard Danishes",
            "Sticky Pecan Nut Buns"
        ]
    },
    {
        id: "pastries-strawberry",
        title: "Strawberry Danish Crown",
        price: 30,
        priceText: "Prices start from R30 / pastry",
        desc: "A crown-shaped flaky pastry baked with premium butter, centered with a delicious local strawberry compote and sweet vanilla baking custard.",
        category: "pastries",
        img: "images/pastries114.jpg",
        alt: "Fresh strawberry and custard flaky Danish pastry crown",
        bullets: [
            "Imported puff pastry dough layers",
            "Real wild strawberry compote",
            "Lightly dusted with powdered sugar"
        ]
    },
    {
        id: "pastries-pecanroll",
        title: "Pecan Cinnamon Roll",
        price: 28,
        priceText: "Prices start from R28 / pastry",
        desc: "Hand-rolled yeasted sweet dough filled with high-grade cinnamon and brown sugar, baked golden, and drizzled with a decadent cream glaze and fresh pecans.",
        category: "pastries",
        img: "images/pastries55.jpg",
        alt: "Gourmet cinnamon rolls topped with sweet glaze and pecan nuts",
        bullets: [
            "Warm sweet Saigon cinnamon filling",
            "Crisp toasted caramelized pecans",
            "Double-glazed with cream cheese icing"
        ]
    },
    {
        id: "muffins-gourmet",
        title: "Gourmet Muffins",
        price: 20,
        priceText: "Prices start from R20 / muffin",
        desc: "Gourmet muffins in multiple flavors baked fresh daily. Packed with real fruit, premium chocolate chunks, and locally sourced nuts, these are perfect for students and early-morning workers.",
        category: "pastries",
        img: "images/muffins25.jpg",
        alt: "Premium blueberry and double chocolate fudge gourmet muffins baked fresh daily at Sandton kitchen",
        bullets: [
            "Double Chocolate Fudge",
            "Blueberry & Lemon Zest",
            "Bran, Apple & Cinnamon (Healthy Option)"
        ]
    },
    {
        id: "muffins-box",
        title: "Early Morning Muffin Box",
        price: 120,
        priceText: "Prices start from R120 / box of 6",
        desc: "Get a mixed box of our freshly baked gourmet muffins. Includes double chocolate, wild blueberry, and apple-bran options to delight everyone.",
        category: "pastries",
        img: "images/muffins2210.jpg",
        alt: "Freshly baked assortment of six muffins in a presentation box",
        bullets: [
            "Warm and fresh out of the ovens at 5 AM",
            "Excellent morning team meeting sharing pack",
            "Includes double chocolate and berry options"
        ]
    },
    {
        id: "cupcakes-specialty",
        title: "Specialty Cupcakes",
        price: 35,
        priceText: "Prices start from R35 / cupcake",
        desc: "Bite-sized perfection. Our specialty cupcakes are baked using the same premium ingredients as our signature cakes, topped with a velvety smooth mountain of Swiss meringue buttercream. A delightful alternative to a large cake.",
        category: "cakes",
        img: "images/Cake3.jpg",
        alt: "Decadent carrot and strawberry cream cupcakes piped with Swiss meringue frosting at Pretoria Menlyn",
        bullets: [
            "Salted Caramel & Pretzel Crunch",
            "Classic Carrot Cake with Walnuts",
            "Strawberry & Real Champagne Info"
        ]
    },
    {
        id: "savory-pies",
        title: "Savory Pies & Quiches",
        price: 55,
        priceText: "Prices start from R55 / pie",
        desc: "Not everything we bake is sweet! We offer a massive range of deeply satisfying savory pies encased in our signature flaky, buttery crust. Perfect for a quick, warm lunch or explicitly catering a daytime corporate event.",
        category: "savory",
        img: "images/pastries63.jpg",
        alt: "Golden baked chicken and mushroom and steak savory pies fresh out of the oven at T's Cakes",
        bullets: [
            "Classic Pepper Steak Pie",
            "Spinach and Feta Deep Quiche",
            "Chicken & Mushroom Traditional Bake"
        ]
    },
    {
        id: "savory-pietray",
        title: "Artisanal Savory Pie Tray",
        price: 330,
        priceText: "Prices start from R330 / tray of 6",
        desc: "Host in style with a mixed sharing tray of our signature savory pies. Stuffed with slow-cooked premium meats and fresh vegetables, baked to a perfect golden crisp.",
        category: "savory",
        img: "images/pastries666.jpg",
        alt: "Assortment of freshly baked golden savory pies in catering tray",
        bullets: [
            "Gourmet slow-cooked beef and chicken fillings",
            "Perfect warm finger-food catering platters",
            "Double-baked flaky buttery puff pastry casings"
        ]
    },
    {
        id: "cookies-frosted",
        title: "Custom Frosted Cookies",
        price: 18,
        priceText: "Prices start from R18 / cookie",
        desc: "Melt-in-your-mouth shortbread and butter cookies that can be professionally air-brushed and iced to exactly match any party theme or corporate logo. These are extremely popular as individually wrapped wedding favors.",
        category: "cakes",
        img: "images/Cake002.jpg",
        alt: "Intricately frosted shortbread cookies air-brushed with royal icing for celebration party favors",
        bullets: [
            "Rich Vanilla Bean Sugar Cookies",
            "Double Chunk Macadamia Nut",
            "Custom Royal Icing Designs"
        ]
    },
    {
        id: "trays-breakfast",
        title: "Catering Breakfast Trays",
        price: 350,
        priceText: "Prices start from R350 / tray",
        desc: "Take the hassle completely out of morning arrangements. We manually build massive, beautifully arranged breakfast trays featuring a mixed assortment of our absolute best miniature baked goods, ready to serve instantly.",
        category: "savory",
        img: "images/muffins69877.jpg",
        alt: "Huge morning catering platter of miniature butter croissants, Danishes, and fresh berry muffins",
        bullets: [
            "Miniature Croissant & Fresh Jam Board",
            "Assorted Fruit Danish Platter",
            "Mixed Muffins & Coffee Thermos Bundle"
        ]
    }
];
