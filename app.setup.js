import 'dotenv/config';
import bodyparser from 'body-parser';
import cors from 'cors';
import jsend from 'jsend';
import sendMail from './emailSender';

/**
 * @class Setup
 */
export class Setup {
  /**
   * @constructor Setup
   * @param {*} app
   */
  constructor(app) {
    this.app = app;
    this.port = parseInt(process.env.PORT, 10);
  }

  /**
   * @returns {*} void
   */
  useApplicationMiddlewares() {
    this.app.use(bodyparser.json());
    this.app.use(bodyparser.urlencoded({ extended: true }));
    this.app.use(jsend.middleware);

  }

  /**
   * @returns {*} void
   */
  useCorsSecurityconfig() {
    const whitelist = ['http://.compute.amazonaws.com'];
    const corsOptions = {
      origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    };
    this.app.use(cors(corsOptions));
  }

  /**
   * @param {*} prefix
   * @returns {*} void
   */
  setGlobalRoutesPrefix(prefix) {
    this.app.use(prefix, sendMail);
  }

  /**
   * @returns {*} void
   */
  setTestApplicationRoutes() {
    this.app.get('/', (req, res) => res.status(200).jsend.success({
      message: `App is running on ${req.hostname}`,
      path: req.originalUrl
    }));

    this.app.get('/api/v1', (req, res) => res.status(200).jsend.success({
      message: `App is running on ${req.hostname}`,
      path: req.originalUrl
    }));
  }

  /**
   * @returns {*} void
   */
  catchUnknownRoutes() {
    this.app.use('/*', async (_, res) => res.status(404).jsend.fail({ status: 404, message: 'Route unknown' }));
  }

  /**
   * @returns {*} void
   */
  start() {
    const message = '\tApp is running at http://localhost:%d in %s mode';
    const env = process.env.NODE_ENV;

    if (env === 'production') console.info('\tApp is running on %s mode', env);
    else console.info(message, this.port, env);

    this.app.listen(this.port, () => {
      console.info('\t**Press CTRL + C to stop**');
    });
  }
}
