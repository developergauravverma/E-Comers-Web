USE [master]
GO
/****** Object:  Database [ECOMMDB]    Script Date: 09-04-2024 11:41:39 ******/
CREATE DATABASE [ECOMMDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ECOMMDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\ECOMMDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ECOMMDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\ECOMMDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [ECOMMDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ECOMMDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ECOMMDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ECOMMDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ECOMMDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ECOMMDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ECOMMDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [ECOMMDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ECOMMDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ECOMMDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ECOMMDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ECOMMDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ECOMMDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ECOMMDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ECOMMDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ECOMMDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ECOMMDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ECOMMDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ECOMMDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ECOMMDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ECOMMDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ECOMMDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ECOMMDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ECOMMDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ECOMMDB] SET RECOVERY FULL 
GO
ALTER DATABASE [ECOMMDB] SET  MULTI_USER 
GO
ALTER DATABASE [ECOMMDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ECOMMDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ECOMMDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ECOMMDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ECOMMDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ECOMMDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'ECOMMDB', N'ON'
GO
ALTER DATABASE [ECOMMDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [ECOMMDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [ECOMMDB]
GO
/****** Object:  Table [dbo].[tbl_Category]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Category](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](200) NULL,
	[CategorySlugName] [nvarchar](200) NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Product]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Product](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](500) NULL,
	[ProductSlug] [nvarchar](500) NULL,
	[Description] [nvarchar](2000) NULL,
	[Price] [int] NULL,
	[CategoryId] [int] NULL,
	[Quantity] [int] NULL,
	[PhotoPath] [nvarchar](max) NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[Shipping] [nvarchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NULL,
	[Email] [nvarchar](500) NULL,
	[Password] [nvarchar](100) NULL,
	[SaltPassword] [nvarchar](500) NULL,
	[Address] [nvarchar](200) NULL,
	[Phone] [nvarchar](50) NULL,
	[Role] [int] NULL,
	[IsActive] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[Answer] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[tbl_Category] ON 
GO
INSERT [dbo].[tbl_Category] ([Id], [CategoryName], [CategorySlugName], [IsActive], [CreatedBy], [CreatedDate]) VALUES (1, N'Men Collection', N'Men-Collection', 1, 1, CAST(N'2024-04-04T00:09:03.740' AS DateTime))
GO
INSERT [dbo].[tbl_Category] ([Id], [CategoryName], [CategorySlugName], [IsActive], [CreatedBy], [CreatedDate]) VALUES (2, N'Women Collection', N'Women-Collection', 1, 1, CAST(N'2024-04-04T00:09:17.287' AS DateTime))
GO
INSERT [dbo].[tbl_Category] ([Id], [CategoryName], [CategorySlugName], [IsActive], [CreatedBy], [CreatedDate]) VALUES (3, N'Kids Collection', N'Kids-Collection', 1, 1, CAST(N'2024-04-04T00:12:19.573' AS DateTime))
GO
INSERT [dbo].[tbl_Category] ([Id], [CategoryName], [CategorySlugName], [IsActive], [CreatedBy], [CreatedDate]) VALUES (4, N'Watches', N'Watches', 1, 1, CAST(N'2024-04-04T00:12:33.650' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[tbl_Category] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_Product] ON 
GO
INSERT [dbo].[tbl_Product] ([Id], [ProductName], [ProductSlug], [Description], [Price], [CategoryId], [Quantity], [PhotoPath], [IsActive], [CreatedBy], [CreatedDate], [Shipping]) VALUES (1, N'Product 1', N'Product-1', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 10, 1, 30, N'Images\Product\image-1712169874300.jpeg', 0, 1, CAST(N'2024-04-04T17:19:09.043' AS DateTime), N'Yes')
GO
INSERT [dbo].[tbl_Product] ([Id], [ProductName], [ProductSlug], [Description], [Price], [CategoryId], [Quantity], [PhotoPath], [IsActive], [CreatedBy], [CreatedDate], [Shipping]) VALUES (2, N'Product 2', N'Product-2', N'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', 28, 1, 50, N'Images\Product\image-1712169925767.jpeg', 0, 1, CAST(N'2024-04-04T17:19:13.407' AS DateTime), N'Yes')
GO
INSERT [dbo].[tbl_Product] ([Id], [ProductName], [ProductSlug], [Description], [Price], [CategoryId], [Quantity], [PhotoPath], [IsActive], [CreatedBy], [CreatedDate], [Shipping]) VALUES (3, N'product 1', N'product-1', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 10, 1, 300, N'Images\Product\image-1712235492999.jpeg', 1, 1, CAST(N'2024-04-04T18:28:13.097' AS DateTime), N'Yes')
GO
INSERT [dbo].[tbl_Product] ([Id], [ProductName], [ProductSlug], [Description], [Price], [CategoryId], [Quantity], [PhotoPath], [IsActive], [CreatedBy], [CreatedDate], [Shipping]) VALUES (4, N'product 2', N'product-2', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 30, 2, 20, N'Images\Product\image-1712235536038.jpeg', 1, 1, CAST(N'2024-04-04T18:28:56.110' AS DateTime), N'Yes')
GO
INSERT [dbo].[tbl_Product] ([Id], [ProductName], [ProductSlug], [Description], [Price], [CategoryId], [Quantity], [PhotoPath], [IsActive], [CreatedBy], [CreatedDate], [Shipping]) VALUES (5, N'product 3', N'product-3', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 50, 3, 50, N'Images\Product\image-1712235593414.png', 1, 1, CAST(N'2024-04-04T18:29:53.430' AS DateTime), N'Yes')
GO
INSERT [dbo].[tbl_Product] ([Id], [ProductName], [ProductSlug], [Description], [Price], [CategoryId], [Quantity], [PhotoPath], [IsActive], [CreatedBy], [CreatedDate], [Shipping]) VALUES (6, N'product 4', N'product-4', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 70, 4, 59, N'Images\Product\image-1712235673478.png', 1, 1, CAST(N'2024-04-04T18:31:13.497' AS DateTime), N'Yes')
GO
INSERT [dbo].[tbl_Product] ([Id], [ProductName], [ProductSlug], [Description], [Price], [CategoryId], [Quantity], [PhotoPath], [IsActive], [CreatedBy], [CreatedDate], [Shipping]) VALUES (7, N'product 5', N'product-5', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 90, 1, 20, N'Images\Product\image-1712235777686.jpeg', 1, 1, CAST(N'2024-04-04T18:32:57.777' AS DateTime), N'Yes')
GO
INSERT [dbo].[tbl_Product] ([Id], [ProductName], [ProductSlug], [Description], [Price], [CategoryId], [Quantity], [PhotoPath], [IsActive], [CreatedBy], [CreatedDate], [Shipping]) VALUES (8, N'product 6', N'product-6', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 100, 3, 9, N'Images\Product\image-1712235860289.jpeg', 1, 1, CAST(N'2024-04-04T18:34:20.400' AS DateTime), N'Yes')
GO
INSERT [dbo].[tbl_Product] ([Id], [ProductName], [ProductSlug], [Description], [Price], [CategoryId], [Quantity], [PhotoPath], [IsActive], [CreatedBy], [CreatedDate], [Shipping]) VALUES (9, N'product 7', N'product-7', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 200, 4, 38, N'Images\Product\image-1712236051286.png', 1, 1, CAST(N'2024-04-04T18:37:31.320' AS DateTime), N'Yes')
GO
SET IDENTITY_INSERT [dbo].[tbl_Product] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 
GO
INSERT [dbo].[Users] ([Id], [Name], [Email], [Password], [SaltPassword], [Address], [Phone], [Role], [IsActive], [CreatedDate], [Answer]) VALUES (1, N'gaurav', N'gaurav@com1', N'123456', N'$2b$10$3AXM5ITh0deai6d/7q04z.S6VT03RlaDE64m3KCp9RVf9o.OS9wdm', N'modinagar', N'9874563210', 1, 1, CAST(N'2024-03-28T17:39:18.273' AS DateTime), N'goli')
GO
INSERT [dbo].[Users] ([Id], [Name], [Email], [Password], [SaltPassword], [Address], [Phone], [Role], [IsActive], [CreatedDate], [Answer]) VALUES (2, N'garvit', N'garvit@com1', N'123456789', N'$2b$10$DhvqXPkxxFm1V5SlEC2lGuG5aUTVth2Mdhoeb2T8DwNBsHloEjR2e', N'modinagar', N'1234567890', 0, 0, CAST(N'2024-03-28T20:57:04.517' AS DateTime), N'gannu')
GO
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[tbl_Category] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tbl_Category] ADD  DEFAULT ((0)) FOR [CreatedBy]
GO
ALTER TABLE [dbo].[tbl_Category] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tbl_Product] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ('') FOR [Answer]
GO
/****** Object:  StoredProcedure [dbo].[sp_ChangeUserPassword]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   procedure [dbo].[sp_ChangeUserPassword]
	@password nvarchar(200),
	@saltPassword nvarchar(500),
	@userId int
as
begin
declare @isUpdate bit = 0;
	update Users set [Password] = @password, SaltPassword = @saltPassword where Id=@userId
	IF (@@ROWCOUNT > 0)
	BEGIN
		  set @isUpdate = 1
	END
	select @isUpdate as isUpdate
end
GO
/****** Object:  StoredProcedure [dbo].[sp_createNewUser]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create    procedure [dbo].[sp_createNewUser]  
 @name nvarchar(200),  
 @email nvarchar(500),  
 @password nvarchar(100),  
 @saltpassword nvarchar(500),  
 @address nvarchar(200),  
 @phone nvarchar(50),  
 @role int,
 @answer nvarchar(200)
as   
begin  
 declare @userId int =0   
 insert into Users ([Name],Email,[Password],SaltPassword,[Address],[Role], IsActive, Phone, Answer) values  
 (@name,@email,@password,@saltpassword, @address, @role,1, @phone,@answer)  
  
 set @userId = SCOPE_IDENTITY();  
  
 select * from Users where Id = @userId  
end
GO
/****** Object:  StoredProcedure [dbo].[sp_deleteCategory]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create   procedure [dbo].[sp_deleteCategory]
@categoryId int = 0,
@userId int = 0
as
begin
	declare @isDeleted bit = 0
	update tbl_Category set IsActive = 0, CreatedBy = @userId, CreatedDate = GETDATE()
	where Id = @categoryId
	if(@@ROWCOUNT > 0)
	begin
		set @isDeleted = 1
	end
	select @isDeleted as isDeleted
end
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteProductById]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create    procedure [dbo].[sp_DeleteProductById]  
@productId int = 0,
@userId int = 0
as  
begin  
 declare @isDelete bit =0, @imagePath nvarchar(max) = null  
 update tbl_Product set IsActive=0, CreatedBy = @userId, CreatedDate=GETDATE() where Id = @productId  
 if(@@ROWCOUNT > 0)  
 begin  
  set @isDelete = 1  
  set @imagePath = (select PhotoPath from tbl_Product where Id = @productId)  
 end  
 select @isDelete as isDelete, @imagePath as imagePath  
  
end
GO
/****** Object:  StoredProcedure [dbo].[sp_FilterProduct]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create   procedure [dbo].[sp_FilterProduct]
@Check nvarchar(1000) = '',
@Radio nvarchar(1000) = ''
as
begin
	
	declare @queryVar nvarchar(2000) = null, @isActive bit = 0;

	set @queryVar = N'select p.*, c.CategoryName from tbl_Product p inner join tbl_Category c on c.Id = p.CategoryId';

	if(@Check <> '')
	begin
		set @queryVar = @queryVar+N' where c.Id in (select * from 
		string_split('''+@Check+''','','') where [value] <> '''') and p.isActive = 1'
		set @isActive = 1
	end

	if(@Radio <> '')
	begin
		declare @V1 nvarchar(10) = '', @V2 nvarchar(10)=''
		set @V1 = (select top 1 * from string_split(@Radio,',') order by [value])
		set @V2 = (select top 1 * from string_split(@Radio,',') order by [value] desc)
		if(@Check <> '')
		begin
			if(ISNUMERIC(@v2) = 1)
			begin
				set @queryVar = @queryVar + N' and p.Price BETWEEN '+@V1+' and '+@V2
			end
			else
			begin
				set @queryVar = @queryVar + N' and p.Price >= '+@V1
			end
		end
		else if(@Check = '')
		begin
			if(ISNUMERIC(@v2) = 1)
			begin
				set @queryVar = @queryVar + N' where p.Price BETWEEN '+@V1+' and '+@V2+' and p.isActive = 1'
			end
			else
			begin
				set @queryVar = @queryVar + N' where p.Price >= '+@V1+' and p.isActive = 1'
			end
		end
		set @isActive = 1
	end

	if(@isActive = 0)
	begin
		set @queryVar = @queryVar+N' where p.isActive = 1 order by 1'
	end
	else
	begin
		set @queryVar = @queryVar+N' order by 1'
	end
	print @queryVar
	EXECUTE sp_executesql @queryVar

end
GO
/****** Object:  StoredProcedure [dbo].[sp_FindUserByEmail]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create   procedure [dbo].[sp_FindUserByEmail]
	@email nvarchar(500)
as
begin
	declare @isExists bit = 0;
	if exists (select 1 from Users where Email = @email)
	begin
	 set @isExists = 1
	end

	select @isExists as isEmailExists
end
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllProduct]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create   procedure [dbo].[sp_GetAllProduct]
@productId int = 0
as
begin
	if(@productId = 0)
	begin
		select tp.*, tc.CategoryName from tbl_Product tp inner join tbl_Category tc 
		on tc.Id = tp.CategoryId and tc.IsActive=1 
		where tp.IsActive = 1
	end
	else
	begin
		select top 1 tp.*, tc.CategoryName from tbl_Product tp inner join tbl_Category tc 
		on tc.Id = tp.CategoryId and tc.IsActive=1 
		where tp.Id = @productId and tp.IsActive = 1
	end
end
GO
/****** Object:  StoredProcedure [dbo].[sp_GetCategoryByName]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create   procedure [dbo].[sp_GetCategoryByName]
 @CategoryName nvarchar(200)
as
begin
	declare @IsExists bit = 0
	if exists (select 1 from tbl_Category where CategoryName = @CategoryName and IsActive=1)
	begin
		set @IsExists = 1;
	end
	select @IsExists as isExists
end
GO
/****** Object:  StoredProcedure [dbo].[sp_getCategorys]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create   procedure [dbo].[sp_getCategorys]
	@CategoryId int = 0
as
begin
	if(@CategoryId = 0)
	begin
		select * from tbl_Category where IsActive=1
	end
	else
	begin
		select * from tbl_Category where Id = @CategoryId and IsActive=1
	end
end
GO
/****** Object:  StoredProcedure [dbo].[sp_getUserByEmailId]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create   procedure [dbo].[sp_getUserByEmailId]
	@email nvarchar(200) = '',
	@id int = 0
as
begin
	if(@email <> '' and @id = 0)
	begin
		select * from Users where Email = @email
	end
	else
	begin
		select * from Users where Id = @id
	end
end
GO
/****** Object:  StoredProcedure [dbo].[sp_insertProduct]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create    procedure [dbo].[sp_insertProduct]  
 @Name nvarchar(500),  
 @Slug nvarchar(500),  
 @Description nvarchar(2000),  
 @Price int,  
 @CategoryId int,  
 @Quantity int,  
 @PhotoPath nvarchar(max),  
 @userId int,
 @Shipping nvarchar(30)
as  
begin  
 declare @ProductId int = 0  
 insert into tbl_Product (ProductName,ProductSlug,[Description],Price,CategoryId,Quantity,PhotoPath,IsActive,CreatedBy,Shipping)  
 values (@Name, @Slug,@Description,@Price,@CategoryId,@Quantity,@PhotoPath,1,@userId,@Shipping)  
 set @ProductId = SCOPE_IDENTITY()  
 select * from tbl_Product where Id = @ProductId  
end
GO
/****** Object:  StoredProcedure [dbo].[sp_SaveCategory]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create   procedure [dbo].[sp_SaveCategory]
 @CategoryName nvarchar(200),
 @SlugCategory nvarchar(200),
 @userId int
as
begin
declare @CategoryId int = 0
	insert into tbl_Category (CategoryName,CategorySlugName,IsActive,CreatedBy)
	values (@CategoryName, @SlugCategory, 1, @userId)

	set @CategoryId = SCOPE_IDENTITY();

	select * from tbl_Category where Id = @CategoryId

end
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateCategory]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create   procedure [dbo].[sp_UpdateCategory]
 @CategoryName nvarchar(200),
 @SlugCategory nvarchar(200),
 @userId int,
 @CategoryId int
as
begin
	
	update tbl_Category set CategoryName = @CategoryName, 
	CategorySlugName=@SlugCategory, CreatedBy=@userId, CreatedDate=getdate()
	where Id = @CategoryId

	if(@@ROWCOUNT > 0)
	begin
		select top 1 * from tbl_Category where Id = @CategoryId
	end
end
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateProduct]    Script Date: 09-04-2024 11:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create    procedure [dbo].[sp_UpdateProduct]  
 @Name nvarchar(500),  
 @Slug nvarchar(500),  
 @Description nvarchar(2000),  
 @Price int,  
 @CategoryId int,  
 @Quantity int,  
 @PhotoPath nvarchar(max),  
 @userId int,  
 @productId int,
 @Shipping nvarchar(30)
as  
begin  
declare @isUpdate bit = 0  
 update tbl_Product set ProductName=@Name,ProductSlug=@Slug,[Description]=@Description,Price=@Price,CategoryId=@CategoryId,  
 Quantity=@Quantity,PhotoPath=@PhotoPath,CreatedBy=@userId, Shipping=@Shipping where Id = @productId  
  
 if(@@ROWCOUNT > 0)  
 begin  
  set @isUpdate = 1  
 end  
 select @isUpdate as isUpdate  
end
GO
USE [master]
GO
ALTER DATABASE [ECOMMDB] SET  READ_WRITE 
GO
