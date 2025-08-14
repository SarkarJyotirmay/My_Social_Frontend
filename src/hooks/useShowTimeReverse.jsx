import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);

export default function useShowTimeReverse(time) {
    const now = dayjs();
    return dayjs(time).fromNow()
}