import { isEqual } from 'lodash';
import { defaultFilterSettings } from './const';
import Fuse from 'fuse.js';

export function filterUsers(users, options) {
  if (isEqual(options, defaultFilterSettings)) {
    return users;
  }

  let filteredUsers = [...users];
  if (options.searchAllCriteria) {
    const fuseUsersSearch = new Fuse(users, {
      keys: ['firstName', 'lastName', 'address.city', 'address.state', 'university'],
    });
    filteredUsers = fuseUsersSearch
      .search(options.searchAllCriteria)
      .map((rawUser) => rawUser.item);
  }

  return filteredUsers.filter((user) => {
    const genderMatched =
      options.searchGender === 'all' ||
      user.gender === options.searchGender ||
      !options.searchGender;
    const ageMatched =
      (+options.searchAgeFrom || 0) <= user.age && user.age <= (+options.searchAgeTo || 100);
    return genderMatched && ageMatched;
  });
}
