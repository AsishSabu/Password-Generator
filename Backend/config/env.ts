const envConfig={
    PORT:process.env.PORT as string,
    ACCESS_SECRET:process.env.ACCESS_SECRET as string,
    REFRESH_SECRET:process.env.REFRESH_SECRET as string,
    MONGO_URL:process.env.MONGO_URL as string
} as const;
export default envConfig