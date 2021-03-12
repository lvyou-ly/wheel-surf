import WheelSurf from '@/components/WheelSurf.vue';
export default {
    data() {
        return {
            paramObj: {
                background: require('./image/table.jpg'),
                prizeList: [
                    { id: 1, prizeName: '1' },
                    { id: 2, prizeName: '2' },
                    { id: 3, prizeName: '3' },
                    { id: 4, prizeName: '4' },
                    { id: 5, prizeName: '5' },
                    { id: 6, prizeName: '6' },
                ],
                getPrize: {
                    1: 0.5,
                    4: 0.2,
                    5: 0.1,
                    6: 0.2,
                },
                allowGetTimes: 'infinite',
                // direction: 'counterClockWise'
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