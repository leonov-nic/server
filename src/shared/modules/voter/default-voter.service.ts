import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { VoterService } from './index.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { HttpError } from '../../libs/rest/http.error.js';
import { StatusCodes } from 'http-status-codes';
import { VoterEntity, CreateVoterDto } from './index.js';

@injectable()
export class DefaultVoterService implements VoterService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.VoterModel) private readonly voterModel: types.ModelType<VoterEntity>,
  ) {}

  public async create(dto: CreateVoterDto): Promise<DocumentType<VoterEntity>> {
    const isExistRegistration = await this.voterModel.findOne({registration: dto.registration});
    if (isExistRegistration) {
      throw new HttpError(
        StatusCodes.METHOD_NOT_ALLOWED,
        `${isExistRegistration} registration exist`,
        'registrationExists'
      );
    }
    const isExistUser = await this.voterModel.findOne({family: dto.family, name: dto.name, surname: dto.surname, phone: dto.phone});

    if (isExistUser) {
      throw new HttpError(
        StatusCodes.LOCKED,
        `${isExistUser} user exist`,
        'registrationExists'
      );
    }
    const result = await this.voterModel.create(dto);
    this.logger.info(`New voter created: ${dto.family}`);
    return result;
  }

  public async find(): Promise<DocumentType<VoterEntity>[] | null> {
    return await this.voterModel.find({}).sort({ createdAt: SortType.Down }).exec();
  }

  public async deleteById(voterId: string): Promise<DocumentType<VoterEntity> | null> {
    const result = this.voterModel
      .findByIdAndDelete(voterId)
      .exec();
    return (await result).value as DocumentType<VoterEntity>;
  }

  // public async deleteById(voterId: string): Promise<DocumentType<VoterEntity> | null> {
  //   return this.voterModel.findByIdAndDelete(voterId).exec();
  // }

  public async getByDirection(direction: string): Promise<DocumentType<VoterEntity>[] | null> {
    // const limit = !query || query > DEFAULT_VOTER_COUNT ? DEFAULT_VOTER_COUNT : query;
    if (direction === 'all' || direction === '') {
      return await this.voterModel.find({}).sort({ createdAt: SortType.Down }).exec();
    } else {
      return await this.voterModel
        .find({direction: direction}, {}, {})
        // .limit(limit)
        .sort({ createdAt: SortType.Down })
        .exec();
    }
  }

  // public async updateActiveVoters(dto: UpdateVoterDto): Promise<DocumentType<VoterEntity>[]> {
  //   return this.voterModel
  //     .updateMany({'$set': {isCurrent : {'$not': '$isCurrent'}}}, {new: true})
  //     .exec();
  // }

  public async updateActiveVoters(): Promise<number> {
    const result = await this.voterModel.updateMany({isCurrent: true}, {$set: {isCurrent : false}});
    return result.modifiedCount;
  }


  // public async deleteByOfferId(offerId: string): Promise<number> {
  //   const result = await this.commentModel.deleteMany({ offerId }).exec();

  //   return result.deletedCount;
  // }

  public authorPipeline = [
    {
      $lookup: {
        from: 'Users',
        localField: 'author',
        foreignField: '_id',
        as: 'users',
      },
    },
    {
      $addFields: {
        author: { $arrayElemAt: ['$users', 0] },
      },
    },
    {
      $unset: ['users'],
    },
  ];


  // public async updateActiveVoters(): Promise<DocumentType<VoterEntity>[]> {
  //   return this.voterModel
  //     .aggregate([
  //       { $set: { isCurrent: { $not: '$isCurrent' } } },
  //       // ...this.authorPipeline,
  //     ]).exec();
  // }


  // public async updateActiveVoters(): Promise<DocumentType<VoterEntity>[]> {
  //   return this.voterModel
  //     .aggregate([
  //       {
  //         $lookup: {
  //           from: 'voters',
  //           pipeline: [
  //             { $match:{ isCurrent: true } },
  //             { $set: { isCurrent: {$toBool: false} } },
  //           ],
  //           as: 'commentsCount'
  //         },
  //       },
  //       { $unset: ['__v']},
  //     ]);
  // }

  public async exists(id: string): Promise<boolean> {
    return (await this.voterModel.exists({_id: id})) !== null;
  }


  // public async incCommentCount(offerId: string): Promise<DocumentType<VoterEntity> | null> {
  //   return this.voterModel
  //     .findByIdAndUpdate(offerId, {'$inc': {commentsCount: 1,}})
  //     .exec();
  // }


  // public async find(count: number): Promise<DocumentType<VoterEntity>[]> {
  //   const limit = !count || count && count > DEFAULT_VOTER_COUNT ? DEFAULT_VOTER_COUNT : count;
  //   return this.offerModel
  //     .aggregate([
  //       {
  //         $lookup: {
  //           from: 'comments',
  //           let: { offerId: '$_id'},
  //           pipeline: [
  //             {$match: {$expr: { $eq: ['$offerId', '$$offerId'] }}},
  //             {$project: {offerId: 1, rating: 1}},
  //           ],
  //           as: 'commentsCount'
  //         },
  //       },
  //       { $addFields:
  //         { id: {$toString: '$_id'},
  //           commentsCount: { $size: '$commentsCount'},
  //           rating: {$avg: '$commentsCount.rating'},
  //           postDate: '$createdAt',
  //         }
  //       },
  //       { $unset: ['_id', '__v']},
  //       { $limit: limit }
  //     ])
  //     .exec();
  // }

  // public async findDetailed(id: string, count?: number): Promise<DocumentType<OfferEntity>[]> {
  //   const limit = !count || count && count > DEFAULT_VOTER_COUNT ? DEFAULT_VOTER_COUNT : count;
  //   return this.offerModel
  //     .aggregate([
  //       {
  //         $lookup: {
  //           from: 'comments',
  //           let: { offerId: '$_id'},
  //           pipeline: [
  //             {$match: {$expr: { $eq: ['$offerId', '$$offerId'] }}},
  //             {$project: {offerId: 1, rating: 1}},
  //           ],
  //           as: 'commentsCount'
  //         },
  //       },
  //       { $addFields:
  //         { id: {$toString: '$_id'},
  //           commentsCount: { $size: '$commentsCount'},
  //           rating: {$avg: '$commentsCount.rating'},
  //           postDate: '$createdAt',
  //         }
  //       },
  //       { $unset: ['updatedAt', 'createdAt', '_id', '__v']},
  //       { $limit: limit },
  //       {
  //         $lookup: {
  //           from: 'Users',
  //           localField: 'author',
  //           foreignField: '_id',
  //           as: 'users',
  //         },
  //       },
  //       {
  //         $addFields: {
  //           author: { $arrayElemAt: ['$users', 0] },
  //         },
  //       },
  //       {
  //         $unset: ['users'],
  //       },
  //       {
  //         $match: {$expr: {$eq: ['$id', id]}}
  //       },
  //     ])
  //     .exec();
  // }


  // public async getFavourite(userId: string): Promise<DocumentType<OfferEntity>[]> {
  //   const offers = await this.offerModel.aggregate([
  //     {
  //       $lookup: {
  //         from: 'Users',
  //         let: { userId: { $toObjectId: userId } },
  //         pipeline: [
  //           { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
  //           { $project: { _id: 0, favoriteOffers: 1 } },
  //         ],
  //         as: 'users',
  //       },
  //     },
  //     {
  //       $addFields: {
  //         favorites: { $arrayElemAt: ['$users', 0] },
  //       },
  //     },
  //     {
  //       $unset: ['users'],
  //     },
  //     // {
  //     //   $match: {
  //     //     $expr: {
  //     //       $in: ['$_id', '$favorites.favoriteOffers'],
  //     //     },
  //     //   }
  //     // },

  //     {
  //       $match: {
  //         $expr: {
  //           $in: ['$_id', { $map: { input: '$favorites.favoriteOffers', as: 'favorite', in: { $toObjectId: '$$favorite' } } }],
  //         },
  //       }
  //     },
  //     {'$set': {favourite : {'$not': '$favourite'}}}
  //   ]).exec();
  //   return offers;
  // }

}
