CREATE TABLE [dbo].[bouteilles]
(
    [id] INT NOT NULL PRIMARY KEY IDENTITY,
    [categoryId] INT NOT NULL,
    [typeId] INT NOT NULL,
    [name] NVARCHAR(50) NOT NULL,
    [vintage] NVARCHAR(50),
    [details] NVARCHAR(50),
    [image] NVARCHAR(50),
    [countryId] INT NOT NULL,
    [volume] NVARCHAR(50) NOT NULL,
    [alcohol] NUMERIC,
    [quantity] INT NOT NULL,
    [display] BOOLEAN NOT NULL,
    [toBuy] BOOLEAN NOT NULL,
    [createdAt] DATETIME2 NOT NULL, 
    [modifiedAt] DATETIME2 NOT NULL
)