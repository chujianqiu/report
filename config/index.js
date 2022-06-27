import dev from './dev.env';
import test from './test.env';
import prod from './prod.env';
const config = {dev, test,prod}
export default config[process.env.VUE_APP_ENV]
