import { Pages } from "./constants";

export const routes = {
  [Pages.HOME]: {
    id: Pages.HOME,
    key: `route-${Pages.HOME}`,
    path: `/`,
    name: 'Home',
  },
  [Pages.DESTINATION]: {
    id: Pages.DESTINATION,
    key: `route-${Pages.DESTINATION}`,
    path: '/destination',
    name: 'Destination',
  },
  [Pages.CREW]: {
    id: Pages.CREW,
    key: `route-${Pages.CREW}`,
    path: '/crew',
    name: 'Crew'
  },
  [Pages.TECHNOLOGY]: {
    index : 3,
    id: Pages.TECHNOLOGY,
    key: `route-${Pages.TECHNOLOGY}`,
    path: '/technology',
    name: 'Technology',
    title: '',
  },
}

export const navConfig = Object.values(routes);
