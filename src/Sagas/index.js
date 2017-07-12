import { watchFetchCategories, watchFetchItems, watchFetchOrder,
   watchAddToOrder, watchIncreaseOrderItem, watchReduceOrderItem } from './watcher';

export default function* rootSaga() {
  yield [
    watchFetchCategories(),
    watchFetchItems(),
    watchFetchOrder(),
    watchAddToOrder(),
    watchIncreaseOrderItem(),
    watchReduceOrderItem(),
  ]
}
