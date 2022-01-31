import Joi from "joi";
import { DataTypes, Model, Optional, Sequelize } from 'sequelize'

interface PageAttributes {
  id: number;
  title: string;
  content: string;
  views: number;
}

interface PageInput extends Optional<PageAttributes, 'id' | 'views'> {}

const pageValidationSchema = Joi.object({
  title: Joi.string().required().trim(),
  content: Joi.string().trim(),
});

class Page extends Model<PageAttributes, PageInput> implements PageAttributes {
  public id!: number
  public title!: string
  public content!: string
  public views!: number
}

const pageInit = (sequelize: Sequelize) => {
  Page.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.TEXT,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  },{ sequelize });

  Page.sync({ alter: process.env.NODE_ENV === 'development' });
}

export { Page, pageValidationSchema, pageInit };
export type { PageInput };
