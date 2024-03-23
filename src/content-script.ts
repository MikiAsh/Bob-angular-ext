import { initInstantLoginFeature } from './content-scripts/instantLoginFeature';
import { initSessionInfoFeature } from './content-scripts/sessionInfoFeature';

initSessionInfoFeature();
initInstantLoginFeature();