const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/european_soccer');

const Club = db.define('club', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    manager: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    squad: {
        type: Sequelize.TEXT
    },
    
    stadium: {
        type: Sequelize.STRING
    },

    bio: {
        type: Sequelize.TEXT
    },

    clubLogo: {
        type: Sequelize.STRING,
    }
});

const League = db.define('league', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    country: {
        type: Sequelize.STRING,
        allowNull: false
    },

    logo: {
        type: Sequelize.STRING,
        unique: true
    }
});

Club.belongsTo(League);
League.hasMany(Club);

const synAndSeed = async() => {
    await db.sync({ force: true });
    await Promise.all([
        Club.create({ name: 'Bayern Munich', manager: 'Julian Nagelsmann', stadium: '', squad: '', bio: '', clubLogo: '' }),
        Club.create({ name: 'Real Madrid', manager: 'Carlo Ancelotti', stadium: '', squad: '', bio: '', clubLogo: '' }),
        Club.create({ name: 'Borussia Dortmund', manager: 'Marco Rose', stadium: '', squad: '', bio: '', clubLogo: '' }),
        Club.create({ name: 'Chelsea F.C.', manager: 'Thomas Tuchel', stadium: '', squad: '', bio: '', clubLogo: '' }),
        Club.create({ name: 'Paris Saint-Germain F.C.', manager: 'Mauricio Pochettino', stadium: 'Le Parc des Princes', squad: '', bio: '', clubLogo: '' }),
        Club.create({ name: 'FC Barcelona', manager: 'Xavi', stadium: 'Camp Nou', squad: '', bio: '', clubLogo: '' }),
        Club.create({ name: 'Liverpool F.C.', manager: 'Jürgen Klopp', stadium: '', squad: '', bio: '', clubLogo: '' }),
        Club.create({ name: 'Olympique de Marseille', manager: 'Jorge Sampaoli', stadium: 'Orange Vélodrome', squad: '', bio: '', clubLogo: '' }),
        League.create({ name: 'Ligue 1', country: 'France' }),
        League.create({ name: 'Bundesliga', country: 'Germany' }),
        League.create({ name: 'LaLiga', country: 'Spain' }),
        League.create({ name: 'Premier League', country: 'England' })     
    ]);
};

module.exports = {
    models : {
        Club,
        League
    },
    synAndSeed
}