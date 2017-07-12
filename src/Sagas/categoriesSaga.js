import { put, call } from 'redux-saga/effects';
import { fetchCategories } from '../Api/api';
import * as types from '../constants/actionTypes';

export default function* fetchCategoriesSaga({ payload }) {
  try {
    const categories = yield call(fetchCategories);
    yield [
      put({ type: types.FETCH_CATEGORIES_SUCCESS, categories })
    ];
  } catch (error) {
    yield put({ type: 'FETCH_CATEGORIES_ERROR', error });
  }
}
