import { Express, RequestHandler } from 'express';
import { generateSampleSubscription } from './helpers/subscription-helper';
import { generateSampleOffer } from './helpers/offer-helper';
import { ServicesContainer } from './services/container';

// High-order function to inject ServiceContainer into api handlers
const configure: (app: Express, services: ServicesContainer) => void = (app, services) => {
  //
  // Get sample subscription
  //
  app.get('/api/util/subscription', (async (req, res) => {
    const subscription = generateSampleSubscription();

    res.send(subscription);
  }) as RequestHandler);

  //
  // Get sample offer
  //
  app.get('/api/util/offer', (async (req, res) => {
    const offer = generateSampleOffer('SampleOffer', false, true);

    res.send(offer);
  }) as RequestHandler);

  //
  // Get all publishers
  //
  app.get('/api/util/publishers', (async (req, res) => {
    const publishers = await services.stateStore.getPublishersAsync();

    res.send(publishers);
  }) as RequestHandler);

  //
  // Get config
  //
  app.get('/api/util/config', (async (req, res) => {
    res.status(200).send(services.config);
  }) as RequestHandler);

  //
  // Update config
  //
  app.patch('/api/util/config', (async (req, res) => {
    for (const i in req.body) {
      if (Object.prototype.hasOwnProperty.call(services.config, i)) {
        (services.config as any)[i] = req.body[i];
      }
    }

    res.sendStatus(200);
  }) as RequestHandler);
};

export default configure;
