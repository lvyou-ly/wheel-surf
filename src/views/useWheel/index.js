import WheelSurf from '@/components/WheelSurf.vue';
export default {
    data() {
        return {
            paramObj: {
                background: require('./image/table.jpg'),
                prizeList: [
                    { id: 1, prizeName: '1', percent:0.5 },
                    { id: 2, prizeName: '2', percent: 0 },
                    { id: 3, prizeName: '3', percent: 0 },
                    { id: 4, prizeName: '4', percent: 0.2 },
                    { id: 5, prizeName: '5', percent: 0.1 },
                    { id: 6, prizeName: '6', percent: 0.2 },
                ],
                allowGetTimes: 'infinite',
                direction: 'counterClockWise'
            }
        }
    },
    components: {
        WheelSurf,
    },
    methods: {
        success(prize) {
            console.log('success', prize.id);
        },
        error(errorInfo) {
            console.log('error', errorInfo);
        },
    }
}