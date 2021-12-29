CREATE TABLE [dbo].[users]
(
    [id] INT NOT NULL PRIMARY KEY IDENTITY,
    [name] NVARCHAR(50) NOT NULL,
    [username] NVARCHAR(50) NOT NULL,
    [password] NVARCHAR(50) NOT NULL,
    [admin] BOOLEAN NOT NULL,
    [rights] BOOLEAN NOT NULL,
    [createdAt] DATETIME2 NOT NULL, 
    [modifiedAt] DATETIME2 NOT NULL
)