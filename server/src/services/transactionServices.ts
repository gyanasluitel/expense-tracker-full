import cloudinary from "../configurations/cloudinary";
import { CreateTransactionRequest } from "../interfaces/transaction";
import CategoryModel from "../models/CategoryModel";
import TransactionModel from "../models/TransactionModel";

export const createTransaction =  async (data: CreateTransactionRequest, userId: string) => {
    const { type, category, description, amount, date, file } = data;

    const existingCategory = await CategoryModel.findOne({ name: category });

    if (!existingCategory) {
        throw new Error("Category does not exist");
    }

    // If Food is category, it is of "Expense" type
    // When sending request, we should be sending "Expense" as a category either through postman or FE
    if (existingCategory.type !== type) {
        throw new Error("Category type does not match the transaction type")
    }

    let fileUrl = null;

    if (file) {
        try {
            console.log("Trying to upload file here....");

            let folderName = type === "Expense" ? "expenses" : "incomes";

            // Assignment: Move this into a separate service
            const uploaded = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    folder: folderName,
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                }).end((file as any).buffer);
            });

            fileUrl = (uploaded as any).secure_url;
        }
        catch (error) {
            console.error("Error uploading file to cloudinary", error);
            throw new Error(`Error uploading file to cloudinary: ${error}`);
        }
    }

    return await TransactionModel.create({
        userId,
        type,
        category: existingCategory._id,
        description,
        date: new Date(date),
        fileUrl,
        amount
    })
}


export const getAll = async () => {
    return await TransactionModel.find({});
}