class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
      this.appliedFunctions = [];
    }
  
    search() {
      if (this.queryStr.keyword) {
        this.appliedFunctions.push(() => {
          this.query.find({
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          });
        });
      }
      return this;
    }
  
    filter() {
      this.appliedFunctions.push(() => {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page", "limit"];
  
        removeFields.forEach((key) => delete queryCopy[key]);
  
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  
        this.query.find(JSON.parse(queryStr));
      });
      return this;
    }
  
    pagination(resultPerPage) {
      this.appliedFunctions.push(() => {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
  
        this.query.limit(resultPerPage).skip(skip);
      });
      return this;
    }
  
    async execute() {
      try {
        for (const func of this.appliedFunctions) {
          func();
        }
        return await this.query.exec();
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = ApiFeatures;
  