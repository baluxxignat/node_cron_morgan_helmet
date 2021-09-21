const { Car } = require('../dataBase');

module.exports = {
    getAllQuery: async (query = {}) => {
        const {
            perPage = 10,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const orderBy = order === 'asc' ? -1 : 1;

        const filterObject = {};
        const yearFilter = {};

        Object.keys(filters).forEach((item) => {
            switch (item) {
                case 'model': {
                    filterObject.model = { $regex: `^${filters.model}`, $options: 'gi' };
                    break;
                }
                case 'year.lte': {
                    Object.assign(yearFilter, { $lte: +filters['year.lte'] });
                    break;
                }
                case 'year.gte': {
                    Object.assign(yearFilter, { $gte: +filters['year.gte'] });
                    break;
                }
                default: {
                    filterObject[item] = filters[item];
                    break;
                }
            }
        });

        if (Object.keys(yearFilter).length) {
            filterObject.year = yearFilter;
        }

        const cars = await Car
            .find(filterObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page - 1) * perPage);

        return cars;
    }
};
