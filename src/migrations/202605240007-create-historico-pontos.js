export async function up({ queryInterface, Sequelize }) {
    await queryInterface.createTable('HistoricoPontos', {
        id: { 
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        id_usuario: { 
            type: Sequelize.INTEGER, 
            allowNull: false,
            references: { model: 'Users', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        acao: { 
            type: Sequelize.STRING(100), 
            allowNull: false 
        },
        pontos_ganhos: { 
            type: Sequelize.INTEGER, 
            allowNull: false 
        },
        criado_em: { 
            type: Sequelize.DATE, 
            allowNull: false,
            defaultValue: Sequelize.NOW 
        }
    });
}

export async function down({ queryInterface }) {
    await queryInterface.dropTable('HistoricoPontos');
}
