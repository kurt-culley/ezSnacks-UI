import { watchFetchCategories, watchFetchItems, watchFetchOrder,
    watchAddToOrder, watchIncreaseOrderItem, watchReduceOrderItem,
    watchDeleteOrderItem, watchDeleteOrder } from './watcher';

export default function* rootSaga() {
    yield [
        watchFetchCategories(),
        watchFetchItems(),
        watchFetchOrder(),
        watchAddToOrder(),
        watchIncreaseOrderItem(),
        watchReduceOrderItem(),
        watchDeleteOrderItem(),
        watchDeleteOrder(),
    ]
}
