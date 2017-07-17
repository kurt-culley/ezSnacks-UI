import { watchFetchCategories, watchFetchItems, watchFetchOrder,
    watchAddToOrder, watchIncreaseOrderItem, watchReduceOrderItem, watchDeleteOrderItem} from './watcher';

export default function* rootSaga() {
    yield [
        watchFetchCategories(),
        watchFetchItems(),
        watchFetchOrder(),
        watchAddToOrder(),
        watchIncreaseOrderItem(),
        watchReduceOrderItem(),
        watchDeleteOrderItem(),
    ]
}
