/* eslint-env jest */

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';


jest.mock('.*\\.css$', () => ({}), { virtual: true });
