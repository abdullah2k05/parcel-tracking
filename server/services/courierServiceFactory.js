const dhlService = require('./couriers/dhlService');
const tcsService = require('./couriers/tcsService');
const leopardsService = require('./couriers/leopardsService');
const genericCourierService = require('./couriers/genericCourierService');

const serviceMap = {
  DHL: dhlService,
  TCS: tcsService,
  LEOPARDS: leopardsService
};

function courierServiceFactory(courier) {
  return serviceMap[courier] || genericCourierService;
}

module.exports = courierServiceFactory;
